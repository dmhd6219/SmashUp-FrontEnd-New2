import { IconProps } from '@/components/icons/props.tsx';
import { cn } from '@/lib/utils.ts';

export default function DislikeIcon({
    className,
    color = 'onSurfaceVariant',
    hoverColor,
    size = 24,
    width,
    height
}: IconProps) {
    return (
        <svg
            width={size ? size : width}
            height={size ? size : height}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={cn(`text-${color} hover:text-${hoverColor}`, 'fill-current', className)}
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M13.5006 11.9211L12.9213 12.4039C12.8512 12.4622 12.8026 12.5423 12.783 12.6314L11.9029 16.6499C11.494 18.5171 9.46039 19.5246 7.72714 18.7187C6.67374 18.229 6 17.1727 6 16.011V14C4.26366 13.994 2.73372 13.5697 1.63527 12.5321C0.519497 11.4781 0 9.93502 0 8.02227V6.94191C0 5.02908 0.519661 3.4925 1.63883 2.44673C2.74662 1.41159 4.2905 1.0001 6.03741 1.0001H13.5602C13.9502 0.504426 14.5153 0.154026 15.1649 0.0397029C15.3927 -0.000380035 15.6461 -0.000187393 15.9349 3.19524e-05L16 6.62847e-05L16.0652 3.19524e-05C16.354 -0.000187393 16.6074 -0.000380035 16.8352 0.0397029C17.9201 0.230632 18.7695 1.08004 18.9604 2.16491C19.0005 2.39266 19.0003 2.6461 19.0001 2.93487V10.0652C19.0003 10.3539 19.0005 10.6074 18.9604 10.8351C18.7695 11.92 17.9201 12.7694 16.8352 12.9603C16.6074 13.0004 16.354 13.0002 16.0652 13L16 13L15.9349 13C15.6461 13.0002 15.3927 13.0004 15.1649 12.9603C14.4814 12.84 13.8914 12.4584 13.5006 11.9211ZM10.1446 16.2648C9.98217 17.0064 9.17445 17.4066 8.48601 17.0865C8.0676 16.892 7.8 16.4724 7.8 16.011V13.1C7.8 12.603 7.39706 12.2 6.9 12.2H6.03741C4.54811 12.2 3.52344 11.8396 2.87133 11.2236C2.22867 10.6165 1.8 9.62067 1.8 8.02227V6.94191C1.8 5.34358 2.22851 4.35925 2.86777 3.76191C3.51842 3.15393 4.54324 2.8001 6.03741 2.8001H13.0001C13 2.84416 13 2.88907 13 2.93488L13.0001 10.0016C12.974 10.0191 12.9485 10.0381 12.9238 10.0586L11.7689 11.0211C11.3917 11.3355 11.1298 11.7666 11.0247 12.2463L10.1446 16.2648ZM16.5232 11.1876C16.4723 11.1965 16.3925 11.2 16 11.2C15.6076 11.2 15.5278 11.1965 15.4769 11.1876C15.1377 11.1279 14.8722 10.8623 14.8125 10.5231C14.8035 10.4722 14.8001 10.3924 14.8001 9.99998V3.00006C14.8001 2.60764 14.8035 2.5278 14.8125 2.4769C14.8722 2.13772 15.1377 1.87215 15.4769 1.81246C15.5278 1.8035 15.6076 1.80007 16 1.80007C16.3925 1.80007 16.4723 1.8035 16.5232 1.81246C16.8624 1.87215 17.128 2.13772 17.1876 2.4769C17.1966 2.52781 17.2 2.60764 17.2 3.00005V9.99998C17.2 10.3924 17.1966 10.4722 17.1876 10.5231C17.128 10.8623 16.8624 11.1279 16.5232 11.1876Z'
            />
        </svg>
    );
}
