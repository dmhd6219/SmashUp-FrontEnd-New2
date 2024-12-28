import { cn } from '@/lib/utils.ts';
import { IconProps } from '@/components/icons/props.tsx';

export default function LikeOutlineIcon({
    className,
    color = 'onSurfaceVariant',
    size,
    width = 27,
    height = 23
}: IconProps) {
    return (
        <svg
            width={size ? size : width}
            height={size ? size : height}
            viewBox='0 0 27 23'
            xmlns='http://www.w3.org/2000/svg'
            className={cn(`text-${color}`, 'fill-current', className)}
        >
            <path d='M18.8237 0.145677C16.8886 0.23077 15.1532 0.995477 13.6493 2.40372L13.4933 2.55503L13.331 2.39771C11.718 0.905769 9.86744 0.137695 7.8138 0.137695C3.60418 0.137695 0.167969 3.55138 0.167969 7.76067C0.167969 11.8772 1.67108 13.8295 8.4112 19.1551L11.9952 21.952C12.8807 22.6421 14.1219 22.6421 15.0074 21.952L18.1596 19.4953L19.4038 18.5089C25.4542 13.663 26.8346 11.7057 26.8346 7.76067C26.8346 3.55138 23.3984 0.137695 19.1888 0.137695L18.8237 0.145677ZM19.1888 2.5377C22.0765 2.5377 24.4346 4.88041 24.4346 7.76067L24.428 8.15213C24.3269 11.0276 23.0122 12.6071 17.0827 17.2885L13.532 20.059C13.514 20.0731 13.4886 20.0731 13.4706 20.059L10.3184 17.6023L9.15329 16.6799C3.63034 12.2679 2.56797 10.76 2.56797 7.76067C2.56797 4.88041 4.92614 2.5377 7.8138 2.5377C9.59103 2.5377 11.1557 3.36114 12.573 5.09136C13.0563 5.68131 13.9601 5.67671 14.4373 5.08186C15.8199 3.35856 17.3796 2.5377 19.1888 2.5377Z' />
            <path
                d='M18.8237 0.145677C16.8886 0.23077 15.1532 0.995477 13.6493 2.40372L13.4933 2.55503L13.331 2.39771C11.718 0.905769 9.86744 0.137695 7.8138 0.137695C3.60418 0.137695 0.167969 3.55138 0.167969 7.76067C0.167969 11.8772 1.67108 13.8295 8.4112 19.1551L11.9952 21.952C12.8807 22.6421 14.1219 22.6421 15.0074 21.952L18.1596 19.4953L19.4038 18.5089C25.4542 13.663 26.8346 11.7057 26.8346 7.76067C26.8346 3.55138 23.3984 0.137695 19.1888 0.137695L18.8237 0.145677ZM19.1888 2.5377C22.0765 2.5377 24.4346 4.88041 24.4346 7.76067L24.428 8.15213C24.3269 11.0276 23.0122 12.6071 17.0827 17.2885L13.532 20.059C13.514 20.0731 13.4886 20.0731 13.4706 20.059L10.3184 17.6023L9.15329 16.6799C3.63034 12.2679 2.56797 10.76 2.56797 7.76067C2.56797 4.88041 4.92614 2.5377 7.8138 2.5377C9.59103 2.5377 11.1557 3.36114 12.573 5.09136C13.0563 5.68131 13.9601 5.67671 14.4373 5.08186C15.8199 3.35856 17.3796 2.5377 19.1888 2.5377Z'
                fillOpacity='0.2'
            />
        </svg>
    );
}
