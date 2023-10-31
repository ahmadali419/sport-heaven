"use client"
import NavBar from "@/components/NavBar";
import { TbUsersGroup } from "react-icons/tb";
import { FaHandHoldingDollar } from "react-icons/fa6"
import { MdOutlineShoppingCartCheckout } from 'react-icons/md'
import { RiBox3Line } from 'react-icons/ri'
import { BiCartDownload } from 'react-icons/bi';
import { BsCartCheck } from 'react-icons/bs'
import React from "react";
import CountUp from 'react-countup';
import { Chart, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ArcElement)
Chart.register(ChartDataLabels);
const data = {
    labels: ['New', 'Processing', 'Completed'],
    datasets: [
        {
            data: [123, 145, 1224],
            backgroundColor: ['#2563eb', '#fde047', '#22c55e'],
        },
    ],
    hoverOffset: 6
};
const DashboardPage = () => {
    return <div>
        <div className="w-full h-20 bg-white items-center justify-start flex">
            <h1 className="text-2xl font-bold">WELCOME TO ADMIN PANEL</h1>
        </div>
        <div className="p-10">
            <h1 className="text-base font-bold ">STATISTICS</h1>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-blue-100 rounded-lg shadow-md">
                    <TbUsersGroup className="text-3xl text-gray-600 group-hover:text-white" />
                    <p className="text-lg font-semibold text-blue-800">Users</p>
                    {/* <p className="text-gray-500">1,234</p> */}
                    <CountUp end={1234} duration={3} />
                </div>

                <div className="p-4 bg-green-100 rounded-lg shadow-md">
                    <FaHandHoldingDollar className="text-3xl text-gray-600 group-hover:text-white" />
                    <p className="text-lg font-semibold text-green-800">Revenue</p>
                    <p className="text-gray-500">$<CountUp end={2045} duration={2} /></p>

                </div>

                <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
                    <MdOutlineShoppingCartCheckout className="text-3xl text-gray-600 group-hover:text-white" />
                    <p className="text-lg font-semibold text-yellow-800">Orders</p>
                    <CountUp end={1234} duration={1} />
                </div>

                <div className="p-4 bg-purple-100 rounded-lg shadow-md">
                    <RiBox3Line className="text-3xl text-gray-600 group-hover:text-white" />
                    <p className="text-lg font-semibold text-purple-800">Products</p>
                    <CountUp end={765} duration={2} />
                </div>
            </div>
            <h1 className=" text-base font-bold my-4">ORDERS STATICS</h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-4 bg-blue-500 rounded-lg shadow-md">
                    <BiCartDownload className="text-3xl text-white" />
                    <p className="text-lg font-semibold text-white">New</p>
                    {/* <p className="text-gray-500">1,234</p> */}
                    <CountUp end={123} duration={3} className="text-white" />
                </div>

                <div className="p-4 bg-yellow-300 rounded-lg shadow-md">
                    <MdOutlineShoppingCartCheckout className="text-3xl text-gray-600 group-hover:text-white" />
                    <p className="text-lg font-semibold text-gray-600">Processing</p>
                    <p className=" text-gray-600"><CountUp end={145} duration={2} className=" text-gray-600" /></p>

                </div>

                <div className="p-4 bg-green-500 rounded-lg shadow-md">
                    <BsCartCheck className="text-3xl text-white group-hover:text-white" />
                    <p className="text-lg font-semibold text-white">Completed</p>
                    <CountUp end={1224} duration={1} className="text-white" />
                </div>

            </div>
        </div>
        <div className="p-10">
            <div>
                <h1 className=" text-base font-bold my-4">ORDERS CHART</h1>
                <div className="my-3 flex flex-row items-center">
                    <div className="w-10 mr-3 bg-blue-500 h-4 rounded-sm" />
                    <span className="font-thin">NEW ORDERS</span>
                </div>
                <div className="my-3 flex flex-row items-center">
                    <div className="w-10 mr-3 bg-yellow-300 h-4 rounded-sm" />
                    <span className="font-thin">PROCESS ORDERS</span>
                </div>
                <div className="my-3 flex flex-row items-center">
                    <div className="w-10 mr-3 bg-green-500 h-4 rounded-sm" />
                    <span className="font-thin">COMPLETED ORDERS</span>
                </div>
            </div>
            <div className="h-1/3">
                <Doughnut data={data} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '60%', // Adjust the size of the hole in the center (0% for a pie chart, for example)
                    plugins: {
                        datalabels: {
                            color: 'black', // Label text color
                            anchor: 'center', // Label position relative to the chart element ('end' places the label inside the chart)
                            align: 'center', // Label alignment relative to the anchor ('start' aligns the label to the start of the anchor)
                            offset: 0, // Offset from the anchor in pixels
                            font: {
                                weight: 'bold', // Label font weight
                                size: 12, // Label font size
                            },
                            formatter(value, context: any) {
                                const label = context.chart.data.labels[context.dataIndex];
                                return `${label}`;
                            },
                        },

                    },
                }}
                    style={{ height: '50vh' }}
                />
            </div>
        </div>
    </div>;
};

export default DashboardPage;
