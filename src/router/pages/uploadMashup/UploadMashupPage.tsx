import { axiosSession, cn, convertToBase64, removeItem, trim } from '@/lib/utils.ts';
import EditIcon from '@/components/icons/Edit.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label.tsx';
import TrackSmallThumb from '@/router/shared/track/TrackSmallThumb.tsx';
import { Track } from '@/store/entities/track.ts';
import LinkIcon from '@/components/icons/Link.tsx';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import SearchIcon from '@/components/icons/Search.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import axios, { AxiosResponse } from 'axios';
import { TrackSearchResponse, UsersSearchResponse } from '@/types/api/search';
import { RegEx } from '@/lib/regex';
import { YouTubeOEmbedResponse, YouTubeTrack } from '@/types/api/youtube';
import {
    areTracksEqual,
    areUsersEqual,
    GenresResponse,
    isTrackSelected,
    isUserSelected,
    RenderTrack,
    RenderUser,
    SelectedTrack,
    SmashUpSelectedTrack,
    YouTubeSelectedTrack
} from '@/types/api/upload';
import YouTubeTrackSmallThumb from '@/router/shared/track/YouTubeTrackSmallThumb';
import { User } from '@/store/entities/user';
import { useUser } from '@/hooks/useUser';
import { isModerator } from '@/lib/bitmask';

export default function UploadMashupPage() {
    // if (isLoading) return <UploadMashupSkeletonPage />;

    const [image, setImage] = useState<null | string | ArrayBuffer>(null);
    const [allGenres, setAllGenres] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());

    useEffect(() => {
        axiosSession
            .get('/const/genres')
            .then((r: AxiosResponse<GenresResponse>) => setAllGenres(r.data.response));
    }, []);

    const [name, setName] = useState<string>('');
    const [tracksQuery, setTracksQuery] = useState<string>('');
    const [usersQuery, setUsersQuery] = useState<string>('');

    const [debouncedTracksQuery] = useDebounce(tracksQuery, 500);

    const [tracks, setTracks] = useState<Track[]>([]);

    const [youTubeTrackLoading, setYouTubeTrackLoading] = useState<boolean>(false);
    const [youTubeTrack, setYouTubeTrack] = useState<null | YouTubeTrack>(null);

    const [selectedTracks, setSelectedTracks] = useState<SelectedTrack[]>([]);

    const [renderTracks, setRenderTracks] = useState<RenderTrack[]>([]);

    const [debouncedUserQuery] = useDebounce(usersQuery, 500);

    const [users, setUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const [renderUsers, setRenderUsers] = useState<RenderUser[]>([]);

    const loggedUser = useUser();

    // Track search

    const searchYouTube = (link: string) => {
        setYouTubeTrackLoading(true);

        axios
            .get(`https://www.youtube.com/oembed?format=json&url=${link}`)
            .then((r: AxiosResponse<YouTubeOEmbedResponse>) => {
                const title = r.data.title;

                let data: string[] = [];
                for (const separator of ['-', '–', '—']) {
                    data = title.split(separator, 2);
                    if (data.length == 2) {
                        break;
                    }
                }

                if (data.length != 2) {
                    data = ['???', title];
                } else {
                    data = [trim(data[0]), trim(data[1])];
                }

                setYouTubeTrack({
                    authors: [data[0]],
                    name: data[1],
                    imageUrl: r.data.thumbnail_url,
                    link: link
                });
            })
            .then(() => setYouTubeTrackLoading(false));
    };

    useEffect(() => {
        if (RegEx.YOUTUBE.test(debouncedTracksQuery)) {
            const link = RegEx.NORMALIZE_YOUTUBE_LINK(debouncedTracksQuery);
            searchYouTube(link);
            return;
        }

        if (debouncedTracksQuery.length >= 2 && debouncedTracksQuery.length <= 32) {
            axiosSession
                .get(`/track/search?query=${debouncedTracksQuery}`)
                .then((r: AxiosResponse<TrackSearchResponse>) => setTracks(r.data.response));
        } else {
            setTracks([]);
            setYouTubeTrack(null);
        }
    }, [debouncedTracksQuery]);

    useEffect(() => {
        const nonSelectedTracks = calculateNonSelectedTracks(tracks, selectedTracks);

        const renderSelectedTracks = selectedTracks.map((track) => {
            if (track.constructor.name === 'SmashUpSelectedTrack') {
                return {
                    keyType: 'SmashUpSelectedTrack',
                    key: track.key,
                    track: (track as SmashUpSelectedTrack).track,
                    selected: true,
                    statefulOnClick: (selectedTracks: SelectedTrack[]) =>
                        trackStatefulOnClick(track, selectedTracks)
                };
            } else if (track.constructor.name === 'YouTubeSelectedTrack') {
                return {
                    keyType: 'YouTubeSelectedTrack',
                    key: track.key,
                    track: (track as YouTubeSelectedTrack).track as unknown as Track,
                    selected: true,
                    statefulOnClick: (selectedTracks: SelectedTrack[]) =>
                        trackStatefulOnClick(track, selectedTracks)
                };
            } else {
                throw new Error(`${track.constructor.name} not supported`);
            }
        });

        const renderTracks = nonSelectedTracks.map((track) => {
            return {
                keyType: 'SmashUpSelectedTrack',
                key: track.id,
                track: track,
                selected: false,
                statefulOnClick: (selectedTracks: SelectedTrack[]) =>
                    trackStatefulOnClick(new SmashUpSelectedTrack(track), selectedTracks)
            };
        });

        setRenderTracks(renderSelectedTracks.concat(renderTracks));
    }, [tracks]);

    useEffect(() => {
        const selectedTracksKeys = calculateSelectedTracksKeys(selectedTracks);
        const newRenderTracks: RenderTrack[] = [];
        for (const renderTrack of renderTracks) {
            const keys = selectedTracksKeys.get(renderTrack.keyType);

            const selected = keys !== undefined && keys !== null && keys.has(renderTrack.key);

            newRenderTracks.push({
                ...renderTrack,
                selected: selected
            });
        }

        setRenderTracks(newRenderTracks);
    }, [selectedTracks]);

    const trackStatefulOnClick = (track: SelectedTrack, selectedTracks: SelectedTrack[]) => {
        if (isTrackSelected(track, selectedTracks)) {
            setSelectedTracks(removeItem(selectedTracks, track, areTracksEqual));
        } else {
            setSelectedTracks(selectedTracks.concat([track]));
        }
    };

    const calculateSelectedTracksKeys = (selectedTracks: SelectedTrack[]) => {
        const selectedTracksKeys = new Map<string, Set<unknown>>();
        for (const selectedTrack of selectedTracks) {
            const className = selectedTrack.constructor.name;

            let keys = selectedTracksKeys.get(className);
            if (keys === undefined) {
                keys = new Set();
                selectedTracksKeys.set(className, keys);
            }

            keys.add(selectedTrack.key);
        }
        return selectedTracksKeys;
    };

    const calculateNonSelectedTracks = (
        tracks: Track[],
        selectedTracks: SelectedTrack[]
    ): Track[] => {
        const selectedTracksKeys = calculateSelectedTracksKeys(selectedTracks);

        const smashUpKeys = selectedTracksKeys.get('SmashUpSelectedTrack');
        const newNonSelectedTracks = tracks.filter((track) => {
            return smashUpKeys === undefined || smashUpKeys === null || !smashUpKeys.has(track.id);
        });
        return newNonSelectedTracks;
    };

    // User search

    useEffect(() => {
        if (
            loggedUser &&
            !isModerator(loggedUser.permissions) &&
            !isUserSelected(loggedUser, selectedUsers)
        ) {
            setSelectedUsers(selectedUsers.concat([loggedUser]));
            const newRenderUsers = [
                {
                    user: loggedUser,
                    selected: true,
                    statefulOnClick: (selectedUsers: User[]) =>
                        userStatefulOnClick(loggedUser, selectedUsers)
                }
            ].concat(renderUsers);
            console.log('newRenderUsers', newRenderUsers);
            // TODO: fix bug that user is not shown at the first init
            setRenderUsers(newRenderUsers);
        }
    }, [loggedUser]);

    useEffect(() => {
        if (debouncedUserQuery.length >= 2 && debouncedUserQuery.length <= 32) {
            axiosSession
                .get(`/user/search?query=${debouncedUserQuery}`)
                .then((r: AxiosResponse<UsersSearchResponse>) => setUsers(r.data.response));
        } else {
            setUsers([]);
        }
    }, [debouncedUserQuery]);

    useEffect(() => {
        const nonSelectedUsers = calculateNonSelectedUsers(users, selectedUsers);

        const renderSelectedUsers = selectedUsers.map((user) => {
            return {
                user: user,
                selected: true,
                statefulOnClick: (selectedUsers: User[]) => userStatefulOnClick(user, selectedUsers)
            };
        });

        const renderUsers = nonSelectedUsers.map((user) => {
            return {
                user: user,
                selected: false,
                statefulOnClick: (selectedUsers: User[]) => userStatefulOnClick(user, selectedUsers)
            };
        });

        setRenderUsers(renderSelectedUsers.concat(renderUsers));
    }, [users]);

    useEffect(() => {
        const selectedUsersSet = new Set<number>(selectedUsers.map((user) => user.id));
        const newRenderUsers: RenderUser[] = [];
        for (const renderUser of renderUsers) {
            const selected = selectedUsersSet.has(renderUser.user.id);

            newRenderUsers.push({
                ...renderUser,
                selected: selected
            });
        }

        setRenderUsers(newRenderUsers);
    }, [selectedUsers]);

    const userStatefulOnClick = (user: User, selectedUsers: User[]) => {
        if (isUserSelected(user, selectedUsers)) {
            setSelectedUsers(removeItem(selectedUsers, user, areUsersEqual));
        } else {
            setSelectedUsers(selectedUsers.concat([user]));
        }
    };

    const calculateNonSelectedUsers = (users: User[], selectedUsers: User[]): User[] => {
        const selectedUsersSet = new Set<number>(selectedUsers.map((user) => user.id));
        return users.filter((user) => !selectedUsersSet.has(user.id));
    };

    return (
        <section className='flex flex-col gap-y-6 pr-[35px] h-full'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-4xl text-onSurface'>Настройки</h1>
            </div>
            <div className='w-full flex gap-x-12 flex-1'>
                {/*картинка, mp3*/}
                <div>
                    <label className='relative cursor-pointer h-fit'>
                        {image && typeof image === 'string' ? (
                            <img
                                src={image}
                                className={cn(
                                    'w-[200px] h-[200px] min-w-[200px] min-h-[200px] rounded-[30px] brightness-50'
                                )}
                                draggable={false}
                                alt='uploaded mashup cover'
                            />
                        ) : (
                            <div className='w-[200px] h-[200px] rounded-[30px] bg-surfaceVariant' />
                        )}
                        <EditIcon
                            size={70}
                            className='absolute top-0 right-0 left-0 bottom-0 m-auto'
                            color='onSurface'
                        />
                        <Input
                            type='file'
                            className='hidden'
                            accept='.png,.jpg,.jpeg'
                            onChange={async (e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    setImage(await convertToBase64(e.target.files[0]));
                                }
                            }}
                        />
                    </label>

                    <label>
                        {/* <Button className='w-full'>Загрузить MP3</Button> */}

                        <Input
                            type='file'
                            className='w-[200px]'
                            accept='.mp3'
                            onChange={async (e) => {
                                console.log(e);
                            }}
                        />

                        <div className='mt-0 z-100 w-10px h-1 bg-primary'></div>
                    </label>
                </div>

                <div className='w-full flex flex-col flex-1'>
                    <div className='w-full grid grid-cols-3 gap-x-10 flex-grow'>
                        {/*название, использованные треки*/}
                        <div className='flex flex-col gap-y-[35px]'>
                            <div className='flex flex-col gap-y-2.5'>
                                <Label className='font-medium text-onSurfaceVariant'>
                                    Название мэшапа
                                </Label>
                                <Input value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className='flex flex-col gap-y-2.5'>
                                <Label className='font-medium text-onSurfaceVariant'>
                                    Добавьте использованные треки
                                </Label>
                                <Input
                                    placeholder='Введите название трека'
                                    startIcon={SearchIcon}
                                    value={tracksQuery}
                                    onChange={(e) => setTracksQuery(e.target.value)}
                                />

                                <div className='flex flex-col gap-y-2.5 max-h-[270px] overflow-y-scroll'>
                                    <YouTubeTrackSmallThumb
                                        track={youTubeTrack}
                                        loading={youTubeTrackLoading}
                                        selectedTracks={selectedTracks}
                                        setSelectedTracks={setSelectedTracks}
                                        renderTracks={renderTracks}
                                    />

                                    {renderTracks.map((renderTrack) => (
                                        <TrackSmallThumb
                                            track={renderTrack.track}
                                            selected={renderTrack.selected}
                                            onClick={() =>
                                                renderTrack.statefulOnClick(selectedTracks)
                                            }
                                        />
                                    ))}
                                </div>

                                <Input
                                    startIcon={LinkIcon}
                                    startIconClassName='text-onSurfaceVariant'
                                    placeholder='Ссылка на основу / альт (Если есть)'
                                />
                            </div>
                        </div>

                        {/*жанр, банворды*/}
                        <div className='flex flex-col gap-y-[35px]'>
                            <div className='flex flex-col gap-y-2.5'>
                                <Label className='font-medium text-onSurfaceVariant'>
                                    Выберите жанр
                                </Label>
                                <div className='grid grid-cols-3 gap-x-2.5 gap-y-3 max-h-[252px] overflow-y-scroll'>
                                    {allGenres?.map((genre) => {
                                        const selected = selectedGenres.has(genre);

                                        return (
                                            <div
                                                key={genre}
                                                className={cn(
                                                    'h-[54px] bg-surfaceVariant rounded-2xl flex items-center justify-center cursor-pointer',
                                                    selected ? 'bg-badge text-primary' : ''
                                                )}
                                                onClick={() => {
                                                    const newSelectedGenres = new Set(
                                                        selectedGenres
                                                    );
                                                    if (selected) {
                                                        newSelectedGenres.delete(genre);
                                                    } else {
                                                        newSelectedGenres.add(genre);
                                                    }
                                                    setSelectedGenres(newSelectedGenres);
                                                }}
                                            >
                                                {genre}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className='flex items-center gap-x-4 px-5 py-4 bg-surfaceVariant rounded-2xl'>
                                <Checkbox />
                                <Label className='font-bold text-[18px] text-onSurface'>
                                    Explicit (Мат)
                                </Label>
                            </div>

                            <div className='flex items-center gap-x-4 px-5 py-4 bg-surfaceVariant rounded-2xl'>
                                <Checkbox />
                                <Label className='font-bold text-[18px] text-onSurface'>
                                    Бан-ворды Twitch
                                </Label>
                            </div>
                        </div>

                        {/*авторы*/}
                        <div className='flex flex-col gap-y-[35px]'>
                            <div className='w-full'>
                                <Label className='font-medium text-onSurfaceVariant'>Авторы</Label>
                                <Input
                                    id='newPasswordAgain'
                                    value=''
                                    disabled
                                    placeholder={selectedUsers
                                        .map((user) => user.username)
                                        .join(', ')}
                                    className='p-0 bg-transparent font-bold text-[24px] placeholder:text-onPrimary'
                                />
                            </div>

                            <div className='flex flex-col gap-y-2.5'>
                                <Label className='font-medium text-onSurfaceVariant'>
                                    Добавьте соавторов мэшапа
                                </Label>

                                <Input
                                    placeholder='Введите ник мэшапера'
                                    startIcon={SearchIcon}
                                    value={usersQuery}
                                    onChange={(e) => setUsersQuery(e.target.value)}
                                />

                                <div className='flex flex-col gap-y-2.5 max-h-[200px] overflow-y-scroll'>
                                    {renderUsers.map((renderUser) => {
                                        const user = renderUser.user;
                                        const selected = isUserSelected(user, selectedUsers);

                                        return (
                                            <div
                                                key={user.id}
                                                className={cn(
                                                    'flex items-center gap-x-4 rounded-2xl p-[6px] mr-[7px] cursor-pointer',
                                                    selected ? 'bg-badge' : 'hover:bg-hover'
                                                )}
                                                onClick={() => {
                                                    if (
                                                        loggedUser &&
                                                        loggedUser.id === user.id &&
                                                        !isModerator(loggedUser.permissions)
                                                    ) {
                                                        // TODO: warn that you cannot remove yourself
                                                    } else {
                                                        userStatefulOnClick(user, selectedUsers);
                                                    }
                                                }}
                                            >
                                                <img
                                                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/track/${user.imageUrl}_100x100.png`}
                                                    alt={user.username}
                                                    className='w-12 h-12 rounded-xl object-cover'
                                                    draggable={false}
                                                />
                                                <span
                                                    className={cn(
                                                        'font-bold',
                                                        selected ? 'text-primary' : 'text-onSurface'
                                                    )}
                                                >
                                                    {user.username}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*сохранить*/}
                    <div className='bg-surfaceVariant p-5 w-fit rounded-[30px] flex items-center gap-x-6'>
                        <Button className='w-[460px]'>Опубликовать</Button>
                        <div className='flex items-center gap-x-4'>
                            <Checkbox />
                            <span>
                                Я прочитал(-а) и согласен(-на) с условиями{' '}
                                <Link
                                    className='text-primary'
                                    to='/privacy_policy'
                                    draggable={false}
                                >
                                    пользовательского соглашения
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
