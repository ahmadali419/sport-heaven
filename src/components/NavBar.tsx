"use client"
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { TbUsersGroup,TbBrandProducthunt } from "react-icons/tb";
import { MdOutlineSpaceDashboard, MdOutlineInventory } from "react-icons/md";
import { Disclosure } from '@headlessui/react'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NavBar = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <div>
            <Disclosure as="nav">

                <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group hover:bg-slate-900">
                    <GiHamburgerMenu className="block lg:hidden h-6 w-6" aria-hidden="true" />
                </Disclosure.Button>
                <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:w-60 lg:left-0 peer-focus:left-0 peer:transition ease-out delay-150 duration-200 ">
                    <div className="flex flex-col justify-start items-center">
                        <Link href="/">
                            <div className="text-base text-center cursor-pointer font-bold text-orange-500 border-b border-gray-100 pb-4 w-full mb-4"><Image alt="logo" src="/SPORT-HEAVEN.png" height={120} width={150} /></div>
                        </Link>

                        <div className="my-2 w-full">
                            <Link href="/admin/dashboard">
                                <div className={`flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto ${pathname == '/admin/dashboard' ? "bg-gray-900" : "hover:bg-gray-900"}`}>
                                    <MdOutlineSpaceDashboard className={`text-2xl ${pathname == '/admin/dashboard' ? "text-white" : "text-gray-600 group-hover:text-white"}`} />
                                    <h3 className={`text-base text-gray-800 ${pathname == '/admin/dashboard' ? "text-white" : "group-hover:text-white"} font-semibold`}>Dashboard</h3>

                                </div>
                            </Link>
                        </div>
                        <div className="my-2 w-full">
                            <Link href="/admin/dashboard/customers">
                                <div className={`flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto ${pathname == '/admin/dashboard/customers' ? "bg-gray-900" : "hover:bg-gray-900"}`}>
                                    <TbUsersGroup className={`text-2xl ${pathname == '/admin/dashboard/customers' ? "text-white" : "text-gray-600 group-hover:text-white"}`} />
                                    <h3 className={`text-base text-gray-800 ${pathname == '/admin/dashboard/customers' ? "text-white" : "group-hover:text-white"} font-semibold`}>Customers</h3>
                                </div>
                            </Link>
                        </div>
                        <div className="my-2 w-full">
                            <Link href="/admin/dashboard/products">
                                <div className={`flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto ${pathname == '/admin/dashboard/products' ? "bg-gray-900" : "hover:bg-gray-900"}`}>
                                    <TbBrandProducthunt className={`text-2xl ${pathname == '/admin/dashboard/products' ? "text-white" : "text-gray-600 group-hover:text-white"}`} />
                                    <h3 className={`text-base text-gray-800 ${pathname == '/admin/dashboard/products' ? "text-white" : "group-hover:text-white"} font-semibold`}>Products</h3>
                                </div>
                            </Link>
                        </div>
                        <div className="my-2 w-full">
                            <Link href="/admin/dashboard/inventory">
                                <div className={`flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto ${pathname == '/admin/dashboard/inventory' ? "bg-gray-900" : "hover:bg-gray-900"}`}>
                                    <MdOutlineInventory className={`text-2xl ${pathname == '/admin/dashboard/inventory' ? "text-white" : "text-gray-600 group-hover:text-white"}`} />
                                    <h3 className={`text-base text-gray-800 ${pathname == '/admin/dashboard/inventory' ? "text-white" : "group-hover:text-white"} font-semibold`}>Inventory</h3>
                                </div>
                            </Link>
                        </div>
                        <div className="my-2 w-full">
                            <Link href="/admin/dashboard/profile">
                                <div className={`flex mb-2 justify-start items-center gap-4 pl-5  p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto ${pathname == '/admin/dashboard/profile' ? "bg-gray-900" : "hover:bg-gray-900"}`}>
                                    <CgProfile className={`text-2xl ${pathname == '/admin/dashboard/profile' ? "text-white" : "text-gray-600 group-hover:text-white"}`} />
                                    <h3 className={`text-base text-gray-800 ${pathname == '/admin/dashboard/profile' ? "text-white" : "group-hover:text-white"} font-semibold`}>Profile</h3>
                                </div>
                            </Link>
                        </div>
                        <div className="my-2 w-full">
                            <Link href="/admin">
                                <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                                    <AiOutlineLogout className="text-2xl text-gray-600 group-hover:text-white" />
                                    <h3 className="text-base text-gray-800 group-hover:text-white font-semibold">Logout</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="lg:ml-60">
                    {children}
                </div>
            </Disclosure>
        </div>
    );
};

export default NavBar;
