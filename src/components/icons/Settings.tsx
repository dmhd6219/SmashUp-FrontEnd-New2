import { IconProps } from '@/components/icons/props.tsx';
import { cn } from '@/lib/utils.ts';

export default function SettingsIcon({
    className,
    color = 'onSurfaceVariant',
    hoverColor,
    size = 28,
    width,
    height
}: IconProps) {
    return (
        <svg
            width={size ? size : width}
            height={size ? size : height}
            viewBox='0 0 28 28'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={cn(`text-${color} hover:text-${hoverColor}`, 'fill-current', className)}
        >
            <path d='M15.3481 0.0487844C15.8501 0.130691 16.3251 0.326567 16.7515 0.67442C17.4501 1.24425 17.7828 1.96256 18.0399 3.01124C18.1057 3.2797 18.2196 3.59267 18.362 3.89641C18.6885 4.03796 19.008 4.1953 19.3194 4.36779C19.6268 4.29036 19.922 4.18753 20.1577 4.07564C21.8161 3.28844 23.2073 3.3298 24.3466 4.58276C24.443 4.68874 24.5005 4.75895 24.6257 4.91657L25.3647 5.84709C25.5635 6.09734 25.6484 6.21136 25.7738 6.42412C26.5862 7.80278 26.2694 9.08676 25.2425 10.4781C25.0721 10.7089 24.8981 11.0112 24.7526 11.3291C24.8444 11.6674 24.9209 12.0104 24.9817 12.3573C25.2432 12.571 25.5213 12.7582 25.7669 12.886C26.7111 13.3773 27.3227 13.8694 27.7101 14.6916C27.9466 15.1936 28.027 15.7095 27.9923 16.2267C27.974 16.5001 27.945 16.6525 27.8677 16.9937L27.6036 18.1603C27.5263 18.5015 27.4868 18.6515 27.3858 18.9054C27.1946 19.3857 26.9005 19.8135 26.4722 20.1589C25.7705 20.7248 25.0093 20.8937 23.9493 20.9133C23.6811 20.9182 23.3607 20.96 23.042 21.0316C22.8348 21.3236 22.6141 21.6053 22.3808 21.8759C22.3848 22.2042 22.4168 22.5269 22.4716 22.7908C22.6914 23.8482 22.7012 24.6425 22.3183 25.467C22.0846 25.9702 21.7419 26.3585 21.3259 26.6566C21.106 26.8141 20.9716 26.887 20.6629 27.0405L19.6074 27.5654C19.2987 27.7189 19.1597 27.782 18.9025 27.8617C18.4161 28.0125 17.905 28.0487 17.3721 27.9267C16.4993 27.7268 15.8914 27.2299 15.2095 26.4022C15.0292 26.1835 14.7829 25.9454 14.515 25.731C14.3438 25.7389 14.1721 25.7429 14 25.7429C13.8278 25.7429 13.6561 25.7389 13.4849 25.731C13.2171 25.9454 12.9707 26.1835 12.7905 26.4022C12.1085 27.2299 11.5007 27.7268 10.6278 27.9267C10.095 28.0487 9.58389 28.0125 9.09742 27.8617C8.84029 27.782 8.70119 27.7189 8.3925 27.5654L7.33704 27.0405C7.24425 26.9945 7.18669 26.9654 7.11945 26.9297C5.57929 26.1119 5.12779 24.7182 5.52834 22.7908C5.58317 22.5269 5.61518 22.2042 5.61918 21.8759C5.38585 21.6053 5.16516 21.3236 4.95793 21.0316C4.6392 20.96 4.31879 20.9182 4.05066 20.9133C2.99069 20.8937 2.22942 20.7248 1.52773 20.1589C1.09939 19.8135 0.805372 19.3857 0.614161 18.9054C0.513092 18.6515 0.473623 18.5015 0.396363 18.1603L0.132202 16.9937C0.0504051 16.6324 0.0202712 16.4713 0.00475483 16.1786C-0.0243331 15.6298 0.0786579 15.0847 0.351838 14.5674C0.749865 13.8138 1.33901 13.3512 2.23309 12.886C2.47866 12.7582 2.7567 12.571 3.01828 12.3573C3.07906 12.0104 3.15552 11.6674 3.24733 11.3291C3.10179 11.0112 2.92782 10.7089 2.75743 10.4781C1.73052 9.08676 1.41372 7.80278 2.22617 6.42412C2.35155 6.21136 2.43646 6.09734 2.63521 5.84709L3.37422 4.91657C3.4994 4.75895 3.55694 4.68874 3.65331 4.58276C4.79261 3.3298 6.18386 3.28844 7.84225 4.07564C8.07798 4.18753 8.37317 4.29036 8.68055 4.36779C8.99196 4.1953 9.31143 4.03796 9.63797 3.89641C9.78032 3.59267 9.89422 3.2797 9.96004 3.01124C10.2172 1.96256 10.5498 1.24425 11.2484 0.67442C11.6749 0.326567 12.1498 0.130691 12.6519 0.0487844C12.8642 0.0141497 13.004 0.00370856 13.2273 0.000917499L14.5871 0C14.9306 0 15.0827 0.005491 15.3481 0.0487844ZM14.6877 2.39494L13.4128 2.39469C12.8257 2.39469 12.5321 2.39469 12.2385 3.59204C12.0756 4.25665 11.7317 5.10572 11.2571 5.83208C10.5026 6.084 9.79288 6.43704 9.14351 6.8755C8.30182 6.79094 7.45242 6.53206 6.85104 6.2466C5.75368 5.72572 5.56893 5.95835 5.19942 6.4236L4.46041 7.35411C4.09091 7.81937 3.90615 8.052 4.634 9.03814C5.04367 9.59318 5.48083 10.415 5.73435 11.2605C5.47475 11.9781 5.30247 12.7387 5.23065 13.5291C4.6416 14.1688 3.90256 14.7058 3.30065 15.019C2.22249 15.58 2.28853 15.8717 2.42061 16.455L2.68477 17.6216C2.81685 18.205 2.88289 18.4966 4.09313 18.519C4.76228 18.5313 5.64669 18.6808 6.44512 18.9864C6.85064 19.6746 7.34406 20.3028 7.90953 20.855C8.02033 21.7141 7.96414 22.6221 7.82593 23.2872C7.57501 24.4946 7.83887 24.6258 8.3666 24.8882L9.42206 25.4131C9.94978 25.6755 10.2136 25.8068 10.9923 24.8618C11.4289 24.332 12.1123 23.7154 12.86 23.2737C13.2332 23.3229 13.6137 23.3482 14 23.3482C14.3863 23.3482 14.7668 23.3229 15.1399 23.2737C15.8876 23.7154 16.571 24.332 17.0077 24.8618C17.7863 25.8068 18.0502 25.6755 18.5779 25.4131L19.6333 24.8882C20.1611 24.6258 20.4249 24.4946 20.174 23.2872C20.0358 22.6221 19.9796 21.7141 20.0904 20.855C20.6559 20.3028 21.1493 19.6746 21.5548 18.9864C22.3532 18.6808 23.2377 18.5313 23.9068 18.519C25.1171 18.4966 25.1831 18.205 25.3152 17.6216L25.5793 16.455C25.7114 15.8717 25.7774 15.58 24.6993 15.019C24.0974 14.7058 23.3583 14.1688 22.7693 13.5291C22.6975 12.7387 22.5252 11.9781 22.2656 11.2605C22.5191 10.415 22.9563 9.59318 23.3659 9.03814C24.0938 8.052 23.909 7.81937 23.5395 7.35411L22.8005 6.4236C22.431 5.95835 22.2463 5.72572 21.1489 6.2466C20.5475 6.53206 19.6981 6.79094 18.8564 6.8755C18.2071 6.43704 17.4974 6.084 16.7428 5.83208C16.2682 5.10572 15.9244 4.25665 15.7614 3.59204C15.4851 2.46512 15.2088 2.39883 14.6877 2.39494ZM14 8.98009C16.9184 8.98009 19.2843 11.3924 19.2843 14.3681C19.2843 17.3439 16.9184 19.7562 14 19.7562C11.0815 19.7562 8.71562 17.3439 8.71562 14.3681C8.71562 11.3924 11.0815 8.98009 14 8.98009ZM14 11.3748C12.3786 11.3748 11.0642 12.715 11.0642 14.3681C11.0642 16.0213 12.3786 17.3615 14 17.3615C15.6213 17.3615 16.9357 16.0213 16.9357 14.3681C16.9357 12.715 15.6213 11.3748 14 11.3748Z' />
            <path
                d='M15.3481 0.0487844C15.8501 0.130691 16.3251 0.326567 16.7515 0.67442C17.4501 1.24425 17.7828 1.96256 18.0399 3.01124C18.1057 3.2797 18.2196 3.59267 18.362 3.89641C18.6885 4.03796 19.008 4.1953 19.3194 4.36779C19.6268 4.29036 19.922 4.18753 20.1577 4.07564C21.8161 3.28844 23.2073 3.3298 24.3466 4.58276C24.443 4.68874 24.5005 4.75895 24.6257 4.91657L25.3647 5.84709C25.5635 6.09734 25.6484 6.21136 25.7738 6.42412C26.5862 7.80278 26.2694 9.08676 25.2425 10.4781C25.0721 10.7089 24.8981 11.0112 24.7526 11.3291C24.8444 11.6674 24.9209 12.0104 24.9817 12.3573C25.2432 12.571 25.5213 12.7582 25.7669 12.886C26.7111 13.3773 27.3227 13.8694 27.7101 14.6916C27.9466 15.1936 28.027 15.7095 27.9923 16.2267C27.974 16.5001 27.945 16.6525 27.8677 16.9937L27.6036 18.1603C27.5263 18.5015 27.4868 18.6515 27.3858 18.9054C27.1946 19.3857 26.9005 19.8135 26.4722 20.1589C25.7705 20.7248 25.0093 20.8937 23.9493 20.9133C23.6811 20.9182 23.3607 20.96 23.042 21.0316C22.8348 21.3236 22.6141 21.6053 22.3808 21.8759C22.3848 22.2042 22.4168 22.5269 22.4716 22.7908C22.6914 23.8482 22.7012 24.6425 22.3183 25.467C22.0846 25.9702 21.7419 26.3585 21.3259 26.6566C21.106 26.8141 20.9716 26.887 20.6629 27.0405L19.6074 27.5654C19.2987 27.7189 19.1597 27.782 18.9025 27.8617C18.4161 28.0125 17.905 28.0487 17.3721 27.9267C16.4993 27.7268 15.8914 27.2299 15.2095 26.4022C15.0292 26.1835 14.7829 25.9454 14.515 25.731C14.3438 25.7389 14.1721 25.7429 14 25.7429C13.8278 25.7429 13.6561 25.7389 13.4849 25.731C13.2171 25.9454 12.9707 26.1835 12.7905 26.4022C12.1085 27.2299 11.5007 27.7268 10.6278 27.9267C10.095 28.0487 9.58389 28.0125 9.09742 27.8617C8.84029 27.782 8.70119 27.7189 8.3925 27.5654L7.33704 27.0405C7.24425 26.9945 7.18669 26.9654 7.11945 26.9297C5.57929 26.1119 5.12779 24.7182 5.52834 22.7908C5.58317 22.5269 5.61518 22.2042 5.61918 21.8759C5.38585 21.6053 5.16516 21.3236 4.95793 21.0316C4.6392 20.96 4.31879 20.9182 4.05066 20.9133C2.99069 20.8937 2.22942 20.7248 1.52773 20.1589C1.09939 19.8135 0.805372 19.3857 0.614161 18.9054C0.513092 18.6515 0.473623 18.5015 0.396363 18.1603L0.132202 16.9937C0.0504051 16.6324 0.0202712 16.4713 0.00475483 16.1786C-0.0243331 15.6298 0.0786579 15.0847 0.351838 14.5674C0.749865 13.8138 1.33901 13.3512 2.23309 12.886C2.47866 12.7582 2.7567 12.571 3.01828 12.3573C3.07906 12.0104 3.15552 11.6674 3.24733 11.3291C3.10179 11.0112 2.92782 10.7089 2.75743 10.4781C1.73052 9.08676 1.41372 7.80278 2.22617 6.42412C2.35155 6.21136 2.43646 6.09734 2.63521 5.84709L3.37422 4.91657C3.4994 4.75895 3.55694 4.68874 3.65331 4.58276C4.79261 3.3298 6.18386 3.28844 7.84225 4.07564C8.07798 4.18753 8.37317 4.29036 8.68055 4.36779C8.99196 4.1953 9.31143 4.03796 9.63797 3.89641C9.78032 3.59267 9.89422 3.2797 9.96004 3.01124C10.2172 1.96256 10.5498 1.24425 11.2484 0.67442C11.6749 0.326567 12.1498 0.130691 12.6519 0.0487844C12.8642 0.0141497 13.004 0.00370856 13.2273 0.000917499L14.5871 0C14.9306 0 15.0827 0.005491 15.3481 0.0487844ZM14.6877 2.39494L13.4128 2.39469C12.8257 2.39469 12.5321 2.39469 12.2385 3.59204C12.0756 4.25665 11.7317 5.10572 11.2571 5.83208C10.5026 6.084 9.79288 6.43704 9.14351 6.8755C8.30182 6.79094 7.45242 6.53206 6.85104 6.2466C5.75368 5.72572 5.56893 5.95835 5.19942 6.4236L4.46041 7.35411C4.09091 7.81937 3.90615 8.052 4.634 9.03814C5.04367 9.59318 5.48083 10.415 5.73435 11.2605C5.47475 11.9781 5.30247 12.7387 5.23065 13.5291C4.6416 14.1688 3.90256 14.7058 3.30065 15.019C2.22249 15.58 2.28853 15.8717 2.42061 16.455L2.68477 17.6216C2.81685 18.205 2.88289 18.4966 4.09313 18.519C4.76228 18.5313 5.64669 18.6808 6.44512 18.9864C6.85064 19.6746 7.34406 20.3028 7.90953 20.855C8.02033 21.7141 7.96414 22.6221 7.82593 23.2872C7.57501 24.4946 7.83887 24.6258 8.3666 24.8882L9.42206 25.4131C9.94978 25.6755 10.2136 25.8068 10.9923 24.8618C11.4289 24.332 12.1123 23.7154 12.86 23.2737C13.2332 23.3229 13.6137 23.3482 14 23.3482C14.3863 23.3482 14.7668 23.3229 15.1399 23.2737C15.8876 23.7154 16.571 24.332 17.0077 24.8618C17.7863 25.8068 18.0502 25.6755 18.5779 25.4131L19.6333 24.8882C20.1611 24.6258 20.4249 24.4946 20.174 23.2872C20.0358 22.6221 19.9796 21.7141 20.0904 20.855C20.6559 20.3028 21.1493 19.6746 21.5548 18.9864C22.3532 18.6808 23.2377 18.5313 23.9068 18.519C25.1171 18.4966 25.1831 18.205 25.3152 17.6216L25.5793 16.455C25.7114 15.8717 25.7774 15.58 24.6993 15.019C24.0974 14.7058 23.3583 14.1688 22.7693 13.5291C22.6975 12.7387 22.5252 11.9781 22.2656 11.2605C22.5191 10.415 22.9563 9.59318 23.3659 9.03814C24.0938 8.052 23.909 7.81937 23.5395 7.35411L22.8005 6.4236C22.431 5.95835 22.2463 5.72572 21.1489 6.2466C20.5475 6.53206 19.6981 6.79094 18.8564 6.8755C18.2071 6.43704 17.4974 6.084 16.7428 5.83208C16.2682 5.10572 15.9244 4.25665 15.7614 3.59204C15.4851 2.46512 15.2088 2.39883 14.6877 2.39494ZM14 8.98009C16.9184 8.98009 19.2843 11.3924 19.2843 14.3681C19.2843 17.3439 16.9184 19.7562 14 19.7562C11.0815 19.7562 8.71562 17.3439 8.71562 14.3681C8.71562 11.3924 11.0815 8.98009 14 8.98009ZM14 11.3748C12.3786 11.3748 11.0642 12.715 11.0642 14.3681C11.0642 16.0213 12.3786 17.3615 14 17.3615C15.6213 17.3615 16.9357 16.0213 16.9357 14.3681C16.9357 12.715 15.6213 11.3748 14 11.3748Z'
                fillOpacity='0.2'
            />
        </svg>
    );
}
