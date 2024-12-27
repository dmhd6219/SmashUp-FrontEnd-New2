import { Track } from '@/store/entities/track.ts';
import MoreHorizontalIcon from '@/components/icons/MoreHorizontalIcon.tsx';
import { Button } from '@/components/ui/button.tsx';
import { cn } from '@/lib/utils';
import TrackMoreDropdown from '@/router/shared/track/TrackMoreDropdown.tsx';

export interface TrackThumbProps {
    track: Track;
    selected?: boolean;
    onClick?: () => unknown;
}

export default function TrackSmallThumb({ track, selected, onClick }: TrackThumbProps) {
    return (
        <div
            key={track.id}
            className={cn(
                'flex justify-between p-1.5 w-full group rounded-2xl items-center gap-x-4 cursor-pointer',
                selected ? 'bg-badge' : 'hover:bg-onPrimary'
            )}
            onClick={onClick}
        >
            <img
                src={
                    track.imageUrl.startsWith('https://')
                        ? track.imageUrl
                        : `${import.meta.env.VITE_BACKEND_URL}/uploads/track/${track.imageUrl}_100x100.png`
                }
                alt={track.name}
                className='w-12 h-12 rounded-xl object-cover'
                draggable={false}
            />
            <div className='flex flex-col min-w-0 w-full text-left'>
                <span
                    className={cn(
                        'font-bold truncate',
                        selected ? 'text-primary' : 'text-onSurface'
                    )}
                >
                    {track.name}
                </span>
                <span
                    className={cn(
                        'font-medium truncate',
                        selected ? 'text-primary' : 'text-onSurfaceVariant'
                    )}
                >
                    {track.authors.join(', ')}
                </span>
            </div>

            <TrackMoreDropdown track={track}>
                <Button variant='ghost' size='icon' className='w-0 group-hover:w-fit'>
                    <MoreHorizontalIcon />
                </Button>
            </TrackMoreDropdown>
        </div>
    );
}
