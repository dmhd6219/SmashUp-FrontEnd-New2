import { Link, useLocation } from 'react-router-dom';
import LogoIcon from '@/components/icons/Logo.tsx';
import { useGlobalStore } from '@/store/global.ts';
import LikeOutlineIcon from '@/components/icons/LikeOutline.tsx';
import HomeIcon from '@/components/icons/HomeIcon.tsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { usePlayerStore } from '@/store/player.ts';
import AddIcon from '@/components/icons/Add.tsx';
import AddPlaylistDialog from '@/router/shared/components/playlist/AddPlaylistDialog.tsx';

export default function Sidebar() {
    const location = useLocation();
    const currentUser = useGlobalStore((state) => state.currentUser);
    const queue = usePlayerStore((state) => state.queue);
    const queueIndex = usePlayerStore((state) => state.queueIndex);
    const moderationSrc = usePlayerStore((state) => state.moderationSrc);

    // if (isLoading)
    //     return (
    //         <Skeleton className='rounded-[30px] min-w-[123px] w-[123px] py-[70px] mr-[30px] my-4' />
    //     );

    return (
        <div
            className={`h-[calc(100%-${queue.length > 0 || queueIndex >= 0 || moderationSrc !== null ? '148' : '32'}px)] flex rounded-[30px] flex-col w-[123px] bg-surface pt-[70px] mr-[30px] my-4`}
        >
            {/* Логотип */}
            <Link draggable={false} className='px-7 mb-[70px]' to='/'>
                <LogoIcon color='primary' />
            </Link>

            <div className='flex flex-col gap-y-12 px-12'>
                {/* Навигация */}
                <div className='flex flex-col gap-y-12'>
                    <Link draggable={false} to={'/'}>
                        <HomeIcon
                            color={location.pathname === '/' ? 'primary' : 'onSurfaceVariant'}
                        />
                    </Link>

                    {currentUser ? (
                        <Link draggable={false} to={'/favorites'}>
                            <LikeOutlineIcon
                                color={
                                    location.pathname === '/favorites'
                                        ? 'primary'
                                        : 'onSurfaceVariant'
                                }
                            />
                        </Link>
                    ) : (
                        <TooltipProvider>
                            <Tooltip delayDuration={100}>
                                <TooltipTrigger>
                                    <LikeOutlineIcon color='onSurfaceVariant/50' />
                                </TooltipTrigger>
                                <TooltipContent
                                    className='max-w-[300px] text-center'
                                    side='right'
                                    sideOffset={64}
                                >
                                    <p>
                                        Зарегистрируйся, чтобы иметь возможность сохранять любимые
                                        мэшапы
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}

                    {currentUser ? (
                        <AddPlaylistDialog redirect>
                            <AddIcon color='onSurfaceVariant' />
                        </AddPlaylistDialog>
                    ) : (
                        <TooltipProvider>
                            <Tooltip delayDuration={100}>
                                <TooltipTrigger>
                                    <AddIcon color='onSurfaceVariant/50' />
                                </TooltipTrigger>
                                <TooltipContent
                                    className='max-w-[300px] text-center'
                                    side='right'
                                    sideOffset={64}
                                >
                                    <p>
                                        Зарегистрируйся, чтобы иметь возможность создавать плейлисты
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
            </div>
        </div>
    );
}
