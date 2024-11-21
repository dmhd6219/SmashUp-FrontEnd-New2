import { cn } from '@/lib/utils.ts';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import ShareIcon from '@/components/icons/Share.tsx';
import Section from '@/router/shared/section/Section.tsx';
import { User, useUserStore } from '@/store/entities/user.ts';
import { useEffect, useState } from 'react';
import { Mashup, useMashupStore } from '@/store/entities/mashup.ts';
import MashupThumb from '@/router/shared/mashup/MashupThumb.tsx';
import MashupSmallThumb from '@/router/shared/mashup/MashupSmallThumb.tsx';
import { Playlist, usePlaylistStore } from '@/store/entities/playlist.ts';
import PlaylistThumb from '@/router/shared/playlist/PlaylistThumb.tsx';

interface ProfileProps {
    username: string;
}

export default function Profile({ username }: ProfileProps) {
    const getUserByUsername = useUserStore((state) => state.getOneByStringKey);
    const getMashupsByIds = useMashupStore((state) => state.getManyByIds);
    const getManyPlaylistsByIds = usePlaylistStore((state) => state.getManyByIds);

    const [user, setUser] = useState<User | null>(null);
    const [mashups, setMashups] = useState<Mashup[]>([]);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        getUserByUsername(username).then((r) => setUser(r));
    }, [username]);

    useEffect(() => {
        if (user) {
            getMashupsByIds(user.mashups).then((r) => setMashups(r));
            getManyPlaylistsByIds(user.playlists).then((r) => setPlaylists(r));
        }
    }, [user]);

    if (!user) {
        return;
    }

    return (
        <div className='flex flex-col gap-y-6'>
            {/*шапка*/}
            <div
                className={cn(
                    'bg-surface p-4 rounded-tl-[120px] rounded-bl-[120px] rounded-r-[50px]',
                    'flex items-center gap-x-12'
                )}
            >
                <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/user/${user.imageUrl}_800x800.png`}
                    alt='profile'
                    className='w-[200px] h-[200px] rounded-full'
                />
                <div className='flex flex-col gap-y-4'>
                    <div>
                        <span className='font-medium text-lg text-onSurfaceVariant'>Профиль</span>
                        <div className='flex items-center gap-x-6'>
                            <span className='font-bold text-4xl text-onSurface'>
                                {user.username}
                            </span>
                            <div className='flex items-center gap-x-5'>
                                <Badge>{user.mashups.length} Мэшапов</Badge>
                                <Badge>{user.playlists.length} Плейлистов</Badge>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-5'>
                        <Button variant='ghost' size='icon'>
                            <ShareIcon />
                        </Button>
                    </div>
                </div>
            </div>

            {/*контент*/}
            <div className='grid grid-cols-2 gap-x-6 gap-y-6'>
                {mashups.length > 0 && (
                    <Section
                        title='Популярные треки'
                        link={
                            mashups.length > 5
                                ? {
                                      href: `/profile/${user.username}/tracks`,
                                      title: 'ПОКАЗАТЬ ВСЕ'
                                  }
                                : undefined
                        }
                    >
                        <div className='flex flex-col'>
                            {mashups.slice(0, 5).map((mashup) => (
                                <MashupSmallThumb key={mashup.id} {...mashup} />
                            ))}
                        </div>
                    </Section>
                )}

                {mashups.length > 0 && mashups[mashups.length - 1] && (
                    <Section title='Недавний релиз'>
                        <MashupThumb
                            id={mashups[mashups.length - 1].id}
                            title={mashups[mashups.length - 1].name}
                            authors={mashups[mashups.length - 1].authors}
                            img={`${import.meta.env.VITE_BACKEND_URL}/uploads/mashup/${mashups[mashups.length - 1].imageUrl}_400x400.png`}
                        />
                    </Section>
                )}

                {playlists.length > 0 && (
                    <div className='col-span-full'>
                        <Section title='Плейлисты'>
                            <div className='flex items-center flex-wrap'>
                                {playlists.map((playlist) => (
                                    <PlaylistThumb
                                        img={`${import.meta.env.VITE_BACKEND_URL}/uploads/playlist/${playlist.imageUrl}_400x400.png`}
                                        {...playlist}
                                    />
                                ))}
                            </div>
                        </Section>
                    </div>
                )}
            </div>
        </div>
    );
}