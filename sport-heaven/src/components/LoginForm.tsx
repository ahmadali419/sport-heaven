"use client"
import React from "react";
import * as Tabs from '@radix-ui/react-tabs';
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Text, Button, Card, Box, Avatar, Heading, Strong, TextField } from '@radix-ui/themes';
import Image from "next/image";
import { useForm, SubmitHandler } from 'react-hook-form';
import { loginFormData, loginSchema } from "../app/zodSchema/auth";
import { adminloginAsync, loginAsync } from "@/store/thunks/authThunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<loginFormData>({
        resolver: zodResolver(loginSchema),
    });
    const { push } = useRouter();
    const dispatch = useAppDispatch();
    const { error } = useAppSelector(state => state.auth)
    const onSubmit: SubmitHandler<loginFormData> = async (data) => {
        await dispatch(adminloginAsync(data)).unwrap().then((originalPromiseResult) => {
            push("/admin/dashboard")
        }).catch((rejectedValueOrSerializedError) => {
        });
    };

    return (
        <div>
            <Card variant='classic' style={{ borderRadius: '0px', position: 'sticky' }}>
                <Flex px="4" gap="3" className='justify-between items-end flex flex-row'>
                    <Link href="/">
                        <Image src="/SPORT-HEAVEN.png" alt="me" width="160" height="120" />
                    </Link>
                </Flex>
            </Card>
            <div className="min-w-full items-center flex justify-evenly flex-col pt-6">
                <Heading size="4" className="my-6">WELCOME ADMIN PORTAL</Heading>
                <Tabs.Root
                    className="flex flex-col w-[350px] shadow-[0_2px_10px] shadow-blackA4 rounded-md mt-6"
                    defaultValue="tab1"
                >
                    <Tabs.List className="shrink-0 flex border-b border-mauve6" aria-label="Manage your account">
                        <Tabs.Trigger
                            className="bg-white px-5 h-[70px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                            value="tab1"
                        >
                            <Image src="/SPORT-HEAVEN.png" alt="me" width="160" height="120" />
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content
                        className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
                        value="tab1"
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="my-3">
                                <Text as="span">Email: </Text>
                                <TextField.Input placeholder="Enter email"  {...register('email', { required: 'Email is required' })} />
                                {errors.email && <Text as="p" color="red">{errors.email.message}</Text>}
                            </div>

                            <div className="mb-5">
                                <Text as="span">Password: </Text>
                                <TextField.Input placeholder="Enter password" type="password" spellCheck="false" {...register('password', { required: 'Password is required' })} />
                                {errors.password && <Text as="p" color="red">{errors.password.message}</Text>}
                            </div>
                            <Button type="submit" radius="none">
                                Login
                            </Button>
                        </form>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>);
};

export default LoginForm;
