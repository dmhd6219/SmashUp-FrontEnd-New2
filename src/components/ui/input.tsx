import * as React from 'react';

import { cn } from '@/lib/utils.ts';
import { IconProps } from '@/components/icons/props.tsx';
import LockIcon from '@/components/icons/Lock.tsx';
import HideIcon from '@/components/icons/hide/Hide28';
import { Button } from '@/components/ui/button.tsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    startIcon?: React.FC<IconProps>;
    startIconClassName?: string;
    endIconClassName?: string;
    endIcon?: React.FC<IconProps>;

    error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type,
            startIcon,
            startIconClassName,
            endIcon,
            endIconClassName,
            error,
            ...props
        },
        ref
    ) => {
        const StartIcon = startIcon;
        const EndIcon = endIcon;

        const [showPassword, setShowPassword] = React.useState(false);

        return (
            <div className='w-full relative'>
                <div className='absolute left-5 top-1/2 transform -translate-y-1/2'>
                    {type === 'password' ? (
                        <LockIcon size={23} />
                    ) : (
                        StartIcon && (
                            <StartIcon size={23} color='onSurface' className={startIconClassName} />
                        )
                    )}
                </div>

                <input
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    className={cn(
                        'flex w-full rounded-2xl bg-surface text-onSurface py-[14.5px] px-[25px] focus:outline focus:outline-2 text-[18px] font-bold placeholder:text-onSurfaceVariant ',
                        error ? 'focus:outline-error' : 'focus:outline-primary',
                        startIcon || type === 'password' ? 'pl-[48px]' : '',
                        endIcon || type === 'password' ? 'pr-11' : '',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <div className='absolute right-5 top-1/2 transform -translate-y-3.5'>
                    {type === 'password' ? (
                        <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            onClick={() => {
                                setShowPassword(!showPassword);
                            }}
                        >
                            <HideIcon />
                        </Button>
                    ) : (
                        EndIcon && (
                            <EndIcon color='onSurface' size={23} className={endIconClassName} />
                        )
                    )}
                </div>
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
