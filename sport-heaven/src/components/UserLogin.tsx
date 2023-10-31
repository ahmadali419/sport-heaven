"use client"
import React from "react";
import * as Tabs from '@radix-ui/react-tabs';
import { zodResolver } from "@hookform/resolvers/zod";
import { Flex, Text, Button, Card, Box, Avatar, Heading, Strong, TextField } from '@radix-ui/themes';
import Image from "next/image";
import { useForm, SubmitHandler, Form } from 'react-hook-form';
import { loginFormData, loginSchema } from "../app/zodSchema/auth";
import { loginAsync } from "@/store/thunks/authThunks";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserLogin = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<loginFormData>({
        resolver: zodResolver(loginSchema),
    });
    const { push } = useRouter();
    const dispatch = useAppDispatch();
    const { error, loading } = useAppSelector(state => state.auth)
    const onSubmit: SubmitHandler<loginFormData> = async (data) => {
        let res = await dispatch(loginAsync(data))
        if (res.payload) {
            push("/profile")
        }
    };

    return (
        <Flex>
            <div className="w-full items-center flex justify-evenly flex-col pt-6">

                <Tabs.Root
                    className="flex flex-col w-[80%] h-[60vh] rounded-md mt-6"
                    defaultValue="tab1"
                >
                    <Tabs.List className="shrink-0 flex border-b border-mauve6" aria-label="Manage your account">
                        <Tabs.Trigger
                            className="bg-primary cursor-pointer px-5 h-[70px] flex-1 flex items-center justify-center text-[15px] "
                            value="tab1"
                        >
                            <Text className="text-black font-bold">SIGN IN</Text>
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content
                        className="grow p-5 bg-white rounded-b-md "
                        value="tab1"
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="my-3 w-2/3">
                                {/* <div className="justify-end w-[30%] items-end flex">

                                    <Button radius="none" variant="soft" mt="1" onClick={() => reset()}>
                                        Reset
                                    </Button>
                                </div> */}
                                <Text as="span">Email: </Text>
                                <TextField.Input placeholder="Enter email"  {...register('email', { required: 'Email is required' })} />
                                {errors.email && <Text as="p" color="red">{errors.email.message}</Text>}
                            </div>

                            <div className="mb-5 w-2/3">
                                <Text as="span">Password: </Text>
                                <TextField.Input placeholder="Enter password" type="password" spellCheck="false" {...register('password', { required: 'Password is required' })} />
                                {errors.password && <Text as="p" color="red">{errors.password.message}</Text>}
                            </div>
                            <div className="my-3">

                                <Button type="submit" radius="none">
                                    Login
                                </Button>

                            </div>
                        </form>
                        <div className="my-4">
                            <Link href="/register">
                                <Text className="text-blue-600 cursor-pointer font-extralight">Do not have account? Register</Text>
                            </Link>
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </Flex>);
};

export default UserLogin;
