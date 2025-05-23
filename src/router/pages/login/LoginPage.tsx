import { Input } from '@/components/ui/input.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import VKIcon from '@/components/icons/VK.tsx';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form.tsx';
import { AxiosResponse } from 'axios';
import { axiosSession } from '@/lib/utils.ts';
import { LoginResponse } from '@/router/shared/types/login.ts';
import { useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useGlobalStore } from '@/store/global.ts';
import { useUserStore } from '@/store/entities/user.ts';
import ProfileIcon from '@/components/icons/Profile.tsx';
import { loginFormSchema } from '@/router/shared/schemas/login.ts';
import { useToast } from '@/router/shared/hooks/use-toast.ts';
import { axiosCatcher } from '@/router/shared/toasts/axios.tsx';
import BaseToast from '@/router/shared/toasts/Base';

export default function LoginPage() {
    const { toast } = useToast();

    const { currentUser, updateCurrentUser, updateToken } = useGlobalStore();
    const getUserByToken = useUserStore((state) => state.getOneByStringKey);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false
        }
    });

    function onSubmit(values: z.infer<typeof loginFormSchema>) {
        axiosSession
            .post('/login', { username: values.email, password: values.password })
            .then((r: AxiosResponse<LoginResponse>) => {
                updateToken(r.data.response.token);
                if (values.remember) {
                    localStorage.setItem('smashup_token', r.data.response.token);
                } else {
                    sessionStorage.setItem('smashup_token', r.data.response.token);
                }
                getUserByToken('token', r.data.response.token).then((r) => {
                    updateCurrentUser(r);
                });
            })
            .then(() => navigate('/'))
            .catch(axiosCatcher(toast, 'при попытке входа.'));
    }

    useEffect(() => {
        if (currentUser) {
            navigate('/');
            toast({
                element: (
                    <BaseToast
                        before={'Вы уже'}
                        field={`авторизованы как ${currentUser.username}`}
                    />
                ),
                duration: 4000
            });
        }
    }, [currentUser]);

    return (
        <div className='flex justify-center items-center h-full'>
            <div className='w-full flex flex-col items-center gap-y-8 max-w-[460px]'>
                {/*Заголовок*/}
                <div className='text-center'>
                    <h1 className='text-primary font-bold text-3xl'>Вход</h1>
                    <span className='font-medium text-onSurfaceVariant'>
                        Добро пожаловать снова!
                    </span>
                </div>

                {/*Форма*/}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='w-full flex flex-col gap-y-6'
                    >
                        {/*Почта*/}
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem className='w-full flex flex-col gap-y-2.5'>
                                    <FormLabel className='font-medium text-onSurfaceVariant'>
                                        Никнейм или электронная почта
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            startIcon={ProfileIcon}
                                            startIconClassName='text-onSurfaceVariant'
                                            className='w-full'
                                            placeholder='sanya@smashup.ru'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className='text-onSurfaceVariant font-medium text-[13px]' />
                                </FormItem>
                            )}
                        />

                        {/*Пароль*/}
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem className='w-full flex flex-col gap-y-2.5'>
                                    <div className='w-full flex justify-between items-center'>
                                        <FormLabel className='font-medium text-onSurfaceVariant'>
                                            Пароль
                                        </FormLabel>
                                        <Link
                                            draggable={false}
                                            className='font-medium text-primary'
                                            to='/user/recover_password'
                                        >
                                            Забыл пароль?
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <Input
                                            id='password'
                                            className='w-full'
                                            placeholder='qwerty123'
                                            type='password'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/*Запомнить*/}
                        <FormField
                            control={form.control}
                            name='remember'
                            render={({ field }) => (
                                <FormItem className='flex items-center gap-x-4'>
                                    <FormControl>
                                        <Checkbox
                                            id='remember'
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className='text-onSurface font-medium mt-0'>
                                        Запомнить меня
                                    </FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type='submit'>Войти</Button>
                    </form>
                </Form>

                {/*Сепаратор*/}
                <div className='flex items-center justify-between w-full text-onSurfaceVariant'>
                    <Separator className='w-[30%]' />
                    <span className='font-medium'>Войти с помощью</span>
                    <Separator className='w-[30%]' />
                </div>

                <div className='flex flex-col gap-y-4 w-full items-center'>
                    {/*ВКИД*/}
                    <TooltipProvider>
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger className='w-full'>
                                <Button className='w-full py-[15px]' variant='outline' disabled>
                                    <VKIcon />
                                    VK ID
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Появится уже совсем скоро!</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    {/*Нет аккаунта?*/}
                    <div className='flex items-center gap-x-2.5'>
                        <span className='font-medium text-onSurfaceVariant'>Нет аккаунта?</span>
                        <Link draggable={false} className='font-bold text-primary' to='/register'>
                            Зарегистрируйтесь
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
