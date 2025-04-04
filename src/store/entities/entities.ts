import { create } from 'zustand';
import { axiosSession } from '@/lib/utils.ts';

interface CachingEntity {
    id: number;
}

export type CacheStore<T> = {
    cache: Record<number, T>;
    additionalCache: Record<string, Record<string, number>>;
    pendingRequests: Record<number | string, Promise<T | T[]>>;

    getManyByIds: (ids: number[], needToBeModified?: boolean) => Promise<T[]>;
    getOneById: (id: number) => Promise<T>;
    getOneByStringKey: (keyName: string, key: string) => Promise<T>;

    fetchAndCacheOneByStringKey: (keyName: string, key: string) => Promise<T>;
    fetchAndCacheMany: (ids: number[], needToBeModified?: boolean) => Promise<T[]>;

    updateOneById: (id: number, updatedData: Partial<T> | undefined) => void;
};

export function createEntityStore<T extends CachingEntity>(
    apiPath: string,
    keyNames: string[] = []
) {
    return create<CacheStore<T>>((set, get) => ({
        cache: {},
        additionalCache: keyNames.reduce(
            (acc, key: string) => {
                acc[key] = {};
                return acc;
            },
            {} as Record<string, Record<string, number>>
        ),
        pendingRequests: {},

        getOneById: async (id: number): Promise<T> => {
            if (get().cache[id]) {
                return get().cache[id];
            }

            if (get().pendingRequests[id] !== undefined) {
                await get().pendingRequests[id];
                return get().cache[id];
            }

            await get().fetchAndCacheMany([id]);
            return get().cache[id];
        },

        getOneByStringKey: async (keyName: string, key: string): Promise<T> => {
            const stringKey = `${keyName}:${key}`;

            if (get().additionalCache[keyName][key]) {
                return get().cache[get().additionalCache[keyName][key]];
            }

            if (get().pendingRequests[stringKey] !== undefined) {
                await get().pendingRequests[stringKey];
                return get().cache[get().additionalCache[keyName][key]];
            }

            const fetchPromise = get().fetchAndCacheOneByStringKey(keyName, key);

            set((state) => ({
                pendingRequests: {
                    ...state.pendingRequests,
                    [stringKey]: fetchPromise
                }
            }));

            try {
                return await fetchPromise;
            } finally {
                set((state) => {
                    const newPending = { ...state.pendingRequests };
                    delete newPending[stringKey];
                    return { pendingRequests: newPending };
                });
            }
        },

        getManyByIds: async (ids: number[], needToBeModified: boolean = false): Promise<T[]> => {
            const missingIds = ids.filter((id) => !get().cache[id]);

            if (!missingIds.length) {
                return ids.map((id) => get().cache[id]);
            }

            await get().fetchAndCacheMany(missingIds, needToBeModified);
            return ids.map((id) => get().cache[id]);
        },

        fetchAndCacheMany: async (
            ids: number[],
            needToBeModified: boolean = false
        ): Promise<T[]> => {
            const uniqueIds = Array.from(new Set(ids));
            const toFetchIds = uniqueIds.filter(
                (id) => !get().cache[id] && !get().pendingRequests[id]
            );

            if (!toFetchIds.length) {
                const pendingIds = uniqueIds.filter((id) => get().pendingRequests[id]);
                if (pendingIds.length) {
                    await Promise.all(pendingIds.map((id) => get().pendingRequests[id]));
                }
                return uniqueIds.map((id) => get().cache[id]).filter(Boolean);
            }

            const chunks = [];
            for (let i = 0; i < toFetchIds.length; i += 100) {
                chunks.push(toFetchIds.slice(i, i + 100));
            }

            const fetchPromises = chunks.map((chunk) => {
                const fetchPromise = axiosSession
                    .get<{ status: string; response: T[] }>(
                        `${import.meta.env.VITE_BACKEND_URL}/${apiPath}${needToBeModified ? '_many' : ''}?id=${chunk.join(',')}`
                    )
                    .then((response) => {
                        const fetchedData = response.data.response;

                        set((state) => ({
                            cache: {
                                ...state.cache,
                                ...fetchedData.reduce(
                                    (acc, obj) => {
                                        acc[obj.id] = obj;
                                        return acc;
                                    },
                                    {} as Record<number, T>
                                )
                            },
                            additionalCache: {
                                ...state.additionalCache,
                                ...fetchedData.reduce(
                                    (acc, obj) => {
                                        keyNames.forEach((keyName) => {
                                            // @ts-expect-error сделано специально, в наличии поля уверен
                                            if (obj[keyName]) {
                                                if (!acc[keyName]) {
                                                    acc[keyName] = {};
                                                }
                                                // @ts-expect-error сделано специально, в наличии поля уверен
                                                acc[keyName][obj[keyName]] = obj.id;
                                            }
                                        });
                                        return acc;
                                    },
                                    {} as Record<string, Record<string, number>>
                                )
                            }
                        }));
                        return fetchedData;
                    })
                    .catch((error) => {
                        console.error(`Failed to fetch data for chunk: ${chunk}`, error);
                        throw new Error('Failed to fetch data');
                    });

                chunk.forEach((id) => {
                    set((state) => ({
                        pendingRequests: {
                            ...state.pendingRequests,
                            [id]: fetchPromise
                        }
                    }));
                });

                return fetchPromise;
            });

            const results = await Promise.all(fetchPromises);

            set((state) => {
                const newPending = { ...state.pendingRequests };
                toFetchIds.forEach((id) => delete newPending[id]);
                return { pendingRequests: newPending };
            });

            return results.flat();
        },

        fetchAndCacheOneByStringKey: async (keyName: string, key: string): Promise<T> => {
            if (get().additionalCache[keyName][key]) {
                return get().getOneById(get().additionalCache[keyName][key]);
            }

            return axiosSession
                .get<{ status: string; response: T }>(
                    `${import.meta.env.VITE_BACKEND_URL}/${apiPath}?${keyName}=${key}`
                )
                .then((response) => {
                    const fetchedData = response.data.response;
                    set((state) => {
                        return {
                            ...state,
                            cache: {
                                ...state.cache,
                                [fetchedData.id]: fetchedData
                            },
                            additionalCache: {
                                ...state.additionalCache,
                                [keyName]: {
                                    ...state.additionalCache[keyName],
                                    [key]: fetchedData.id
                                }
                            }
                        };
                    });

                    return fetchedData;
                })
                .catch((error) => {
                    console.error(`Failed to fetch data for key: ${keyName}=${key}`, error);
                    throw new Error('Failed to fetch data');
                });
        },

        updateOneById: (id: number, updatedData: Partial<T> | undefined) => {
            const currentData = get().cache[id];
            const newData = { ...currentData, ...updatedData };
            set((state) => ({
                cache: {
                    ...state.cache,
                    [id]: newData
                }
            }));
        }
    }));
}
