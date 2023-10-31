"use client"
import { Avatar, Box, Card, Flex, Heading, HoverCard, Text } from "@radix-ui/themes";
import * as Separator from '@radix-ui/react-separator';

import Image from "next/image";
import { Transition } from "@headlessui/react";
import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { usePathname } from "next/navigation";
import Link from "next/link";
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsCart2 } from 'react-icons/bs'
import { AiOutlineLogout } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/reducers/authSlice";
const NavbarStore = () => {
    const pathname = usePathname();
    const { user } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <div>
            <Disclosure as="nav" className="bg-gray-50 w-[100vw] shadow-sm">
                {({ open }) => (
                    <>
                        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex-shrink-0">
                                        <Image src="/SPORT-HEAVEN.png" alt="me" width="120" height="64" />
                                    </div>
                                    <div className="hidden md:block items-end">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            <Link
                                                href="/"
                                                className={`text-black uppercase  px-3 py-2 rounded-md text-sm font-medium ${pathname == '/' ? "bg-primary" : "hover:bg-primary"}`}
                                            >
                                                <Text>HOME</Text>
                                            </Link>
                                            <Link
                                                href="/aboutus"
                                                className={` uppercase  px-3 py-2 rounded-md text-sm font-medium ${pathname == "/aboutus" ? "bg-primary" : "hover:bg-primary"}`}
                                            >
                                                <Text>About</Text>
                                            </Link>
                                            <Link
                                                href="/contactus"
                                                className={` uppercase  px-3 py-2 rounded-md text-sm font-medium ${pathname == "/contactus" ? "bg-primary" : "hover:bg-primary"}`}
                                            >
                                                <Text>Contact Us</Text>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-start">
                                        <BsCart2 className="text-3xl mr-4" />
                                        {
                                            user ?
                                                <>
                                                    <HoverCard.Root>
                                                        <HoverCard.Trigger>
                                                            <Link href="/profile">

                                                                <Avatar radius="full" fallback={user?.name[0]} />

                                                            </Link>
                                                        </HoverCard.Trigger>
                                                        <HoverCard.Content>
                                                            <Flex gap="4">
                                                                <Box>
                                                                    <Link href="/profile">
                                                                        <Flex direction="row" align="center" justify="between" className="hover:bg-primary p-2 rounded cursor-pointer">
                                                                            <FaUserCircle />
                                                                            <Text ml="2">Profile</Text>
                                                                        </Flex>
                                                                    </Link>
                                                                    <Link href="/" onClick={() => handleLogout()}>
                                                                        <Flex direction="row" align="center" justify="between" className="hover:bg-primary p-2 rounded cursor-pointer">
                                                                            <AiOutlineLogout />
                                                                            <Text ml="2">Logout</Text>
                                                                        </Flex>
                                                                    </Link>
                                                                </Box>
                                                            </Flex>
                                                        </HoverCard.Content>
                                                    </HoverCard.Root>
                                                </>


                                                :
                                                <Link href="/login">
                                                    <div className="text-base text-blue-600 align-middle cursor-pointer">LOGIN</div>
                                                </Link>
                                        }
                                    </div>

                                </div>
                                {/* mobile view  */}
                                <div className="-mr-2 flex md:hidden">
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white ml-2">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <RxHamburgerMenu className="text-xl" />
                                        ) : (
                                            <RxHamburgerMenu className="text-xl" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>
                        <Disclosure.Panel className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                <Link
                                    href="/"
                                    className={`text-primary ${pathname == '/' ? "bg-primary" : "hover:bg-primary"} block px-3 py-2 rounded-md text-base font-medium`}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/aboutus"
                                    className={`text-primary ${pathname == '/aboutus' ? "bg-primary" : "hover:bg-primary"} block px-3 py-2 rounded-md text-base font-medium `}

                                >
                                    About
                                </Link>
                                <Link
                                    href="/contactus"
                                    className={`text-primary ${pathname == '/contactus' ? "bg-primary" : "hover:bg-primary"} block px-3 py-2 rounded-md text-base font-medium`}

                                >
                                    Contact
                                </Link>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </div>

    )
};

export default NavbarStore;
