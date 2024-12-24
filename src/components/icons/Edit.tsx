import { IconProps } from '@/components/icons/props.tsx';
import { cn } from '@/lib/utils.ts';

export default function EditIcon({
    className,
    color = 'onSurfaceVariant',
    hoverColor,
    size = 26,
    width,
    height
}: IconProps) {
    return (
        <svg
            width={size ? size : width}
            height={size ? size : height}
            viewBox='0 0 26 26'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={cn(`text-${color} hover:text-${hoverColor}`, 'fill-current', className)}
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M21.8952 0.811197C20.9174 0.312934 19.76 0.312934 18.7822 0.811197C18.2932 1.06033 17.868 1.48656 17.3763 1.97967L2.34665 17.0094C1.94196 17.414 1.65121 17.7045 1.41236 18.0333C0.935315 18.6898 0.620435 19.4501 0.493475 20.2517C0.429909 20.653 0.430001 21.0641 0.430138 21.6362L0.430161 22.8279L0.429932 22.9205C0.428755 23.2425 0.427315 23.6383 0.542024 23.9913C0.768127 24.6872 1.31369 25.2328 2.00954 25.4589C2.36261 25.5736 2.75845 25.5721 3.08047 25.571L3.17302 25.5707H4.36465C4.93682 25.5709 5.34789 25.571 5.74925 25.5074C6.55086 25.3805 7.31103 25.0656 7.96762 24.5886C8.29639 24.3497 8.58702 24.059 8.99148 23.6543L24.0212 8.62469C24.5143 8.1328 24.9405 7.70765 25.1896 7.21871C25.6879 6.24082 25.6879 5.08351 25.1896 4.10563C24.9406 3.61668 24.5143 3.19155 24.0213 2.6997L23.3012 1.97968C22.8094 1.48656 22.3843 1.06034 21.8952 0.811197ZM19.8199 2.84778C20.1459 2.6817 20.5316 2.6817 20.8575 2.84778C20.9782 2.90924 21.1288 3.03989 21.7933 3.70445L22.2964 4.20755C22.961 4.8721 23.0916 5.02269 23.1531 5.14332C23.3192 5.46928 23.3192 5.85505 23.1531 6.18101C23.0916 6.30163 22.961 6.45223 22.2964 7.11679L21.3158 8.09738L17.9035 4.68505L18.8842 3.70445C19.5486 3.03989 19.6992 2.90924 19.8199 2.84778ZM16.2872 6.30129L4.02134 18.5672C3.5351 19.0535 3.38141 19.2118 3.26153 19.3768C2.99652 19.7415 2.82158 20.1639 2.75105 20.6091C2.71914 20.8106 2.71588 21.0312 2.71588 21.7189V22.8279C2.71588 23.053 2.71626 23.1762 2.72116 23.2656L2.72194 23.279L2.73527 23.2798C2.82472 23.2847 2.94784 23.285 3.17302 23.285H4.28199C4.96964 23.285 5.19025 23.2817 5.39168 23.2498C5.83702 23.1793 6.25934 23.0043 6.62411 22.7393C6.78911 22.6195 6.94743 22.4658 7.43367 21.9795L19.6996 9.71361L16.2872 6.30129Z'
            />
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M21.8952 0.811197C20.9174 0.312934 19.76 0.312934 18.7822 0.811197C18.2932 1.06033 17.868 1.48656 17.3763 1.97967L2.34665 17.0094C1.94196 17.414 1.65121 17.7045 1.41236 18.0333C0.935315 18.6898 0.620435 19.4501 0.493475 20.2517C0.429909 20.653 0.430001 21.0641 0.430138 21.6362L0.430161 22.8279L0.429932 22.9205C0.428755 23.2425 0.427315 23.6383 0.542024 23.9913C0.768127 24.6872 1.31369 25.2328 2.00954 25.4589C2.36261 25.5736 2.75845 25.5721 3.08047 25.571L3.17302 25.5707H4.36465C4.93682 25.5709 5.34789 25.571 5.74925 25.5074C6.55086 25.3805 7.31103 25.0656 7.96762 24.5886C8.29639 24.3497 8.58702 24.059 8.99148 23.6543L24.0212 8.62469C24.5143 8.1328 24.9405 7.70765 25.1896 7.21871C25.6879 6.24082 25.6879 5.08351 25.1896 4.10563C24.9406 3.61668 24.5143 3.19155 24.0213 2.6997L23.3012 1.97968C22.8094 1.48656 22.3843 1.06034 21.8952 0.811197ZM19.8199 2.84778C20.1459 2.6817 20.5316 2.6817 20.8575 2.84778C20.9782 2.90924 21.1288 3.03989 21.7933 3.70445L22.2964 4.20755C22.961 4.8721 23.0916 5.02269 23.1531 5.14332C23.3192 5.46928 23.3192 5.85505 23.1531 6.18101C23.0916 6.30163 22.961 6.45223 22.2964 7.11679L21.3158 8.09738L17.9035 4.68505L18.8842 3.70445C19.5486 3.03989 19.6992 2.90924 19.8199 2.84778ZM16.2872 6.30129L4.02134 18.5672C3.5351 19.0535 3.38141 19.2118 3.26153 19.3768C2.99652 19.7415 2.82158 20.1639 2.75105 20.6091C2.71914 20.8106 2.71588 21.0312 2.71588 21.7189V22.8279C2.71588 23.053 2.71626 23.1762 2.72116 23.2656L2.72194 23.279L2.73527 23.2798C2.82472 23.2847 2.94784 23.285 3.17302 23.285H4.28199C4.96964 23.285 5.19025 23.2817 5.39168 23.2498C5.83702 23.1793 6.25934 23.0043 6.62411 22.7393C6.78911 22.6195 6.94743 22.4658 7.43367 21.9795L19.6996 9.71361L16.2872 6.30129Z'
                fillOpacity='0.2'
            />
        </svg>
    );
}