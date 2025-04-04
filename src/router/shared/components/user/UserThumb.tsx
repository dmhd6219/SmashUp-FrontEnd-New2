import { Button } from '@/components/ui/button.tsx';
import PlayHollowIcon from '@/components/icons/PlayHollowIcon.tsx';
import { Link } from 'react-router-dom';
import { User } from '@/store/entities/user.ts';
import { usePlayer } from '@/router/features/player/usePlayer.ts';
import PauseHollowIcon from '@/components/icons/PauseHollowIcon.tsx';
import { usePlayerStore } from '@/store/player.ts';
import { useSettingsStore } from '@/store/settings.ts';
import { usePlaylistMashups } from '@/router/shared/components/playlist/usePlaylistMashups.ts';
import { explicitAllowed, isExplicit } from '@/lib/bitmask.ts';

interface ProfileThumbProps {
    user: User;
    searchMode?: boolean;
}

export default function UserThumb({ user, searchMode }: ProfileThumbProps) {
    const settingsBitmask = useSettingsStore((state) => state.settingsBitmask);
    const { isPlaying, queueId } = usePlayerStore();
    const { playQueue, pause } = usePlayer();

    const { mashups, isLoading } = usePlaylistMashups(user.mashups);

    const hideExplicit = settingsBitmask !== null && !explicitAllowed(settingsBitmask);

    // TODO: skeleton
    if (isLoading) return null;

    return (
        <div className='w-fit flex flex-col gap-y-4 p-4 group hover:bg-hover rounded-t-[46px] rounded-b-[30px]'>
            <div className='relative'>
                <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/uploads/user/${user.imageUrl}_400x400.png`}
                    alt={user.username}
                    className='w-[216px] h-[216px] object-cover rounded-full group-hover:opacity-30'
                    draggable={false}
                />
                {isPlaying && queueId === `user/${user.username}/tracks` ? (
                    <Button
                        variant='ghost'
                        size='icon'
                        className='hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                        onClick={() => {
                            pause();
                        }}
                    >
                        <PauseHollowIcon color='onSurface' />
                    </Button>
                ) : (
                    <Button
                        variant='ghost'
                        size='icon'
                        className='hidden group-hover:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                        onClick={() => {
                            playQueue(
                                hideExplicit
                                    ? mashups
                                          .filter((mashup) => !isExplicit(mashup.statuses))
                                          .map((mashup) => mashup.id)
                                    : user.mashups,
                                `Мэшапы ${user.username}`,
                                `user/${user.username}/tracks`
                            );
                        }}
                    >
                        <PlayHollowIcon color='onSurface' />
                    </Button>
                )}
            </div>
            <div className='flex flex-col items-center'>
                <Link
                    draggable={false}
                    to={`/user/${user.username}${searchMode ? `?searchId=${user.id}` : ''}`}
                    className='font-bold text-lg text-onSurface'
                >
                    {user.username}
                </Link>
                <span className='font-medium text-lg text-onSurfaceVariant'>Мэшапер</span>
            </div>
        </div>
    );
}
