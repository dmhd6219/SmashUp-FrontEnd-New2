import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ReactNode } from 'react';
import { Track } from '@/store/entities/track.ts';
import LinkExternalIcon from '@/components/icons/LinkExternal.tsx';
import { Link } from 'react-router-dom';

interface MashupMoreDropdownProps {
    track: Track;
    children: ReactNode;
}

export default function TrackMoreDropdown({ track, children }: MashupMoreDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent side='left'>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link
                            className='flex items-center gap-x-[14.4px]'
                            to={track.link}
                            target='_blank'
                        >
                            <LinkExternalIcon />
                            <span>Открыть оригинал</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
