// resources/js/Components/Sidebar.js

import React from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo";

function Sidebar({auth, showingSidebar }) {
    return (
        <div className="top-0 sticky h-screen hidden xl:block w-1/6 bg-white dark:bg-primary-mid sm:border-r
                        sm:border-gray-700 dark:border-gray-700 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
            <div className="px-12 py-10 flex-col h-full">
                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />

                <div className={"flex flex-col justify-between h-full"}>
                    <ul className="space-y-6 py-12">
                        <li>
                            <Link href={route('dashboard')} className="text-gray-700 dark:text-gray-300 hover:text-gray-900
                                                                   dark:hover:text-gray-200">
                                <i className={"fa fa-dashboard text-m pr-4"}></i>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href={route('farm.index')} className="text-gray-700 dark:text-gray-300
                                                                          hover:text-gray-900 dark:hover:text-gray-200 inline-flex">
                                <i className={"fa fa-map-pin text-m pr-6"}></i>
                                Farms
                            </Link>
                        </li>
                        <li className={"inline-flex"}>
                            <Link href={route('turbine.index')} className="text-gray-700 dark:text-gray-300
                                                                          hover:text-gray-900 dark:hover:text-gray-200 inline-flex">
                                <svg xmlns="http://www.w3.org/2000/svg" className={"text-m pr-4"} height="1em" viewBox="0 0 512 512" >
                                    <path className="fill-gray-200" d="M258.6 0c-1.7 0-3.4 .1-5.1 .5C168 17 115.6
                                    102.3 130.5 189.3c2.9 17 8.4 32.9 15.9 47.4L32 224H29.4C13.2 224 0 237.2 0
                                    253.4c0 1.7 .1 3.4 .5 5.1C17 344 102.3 396.4 189.3 381.5c17-2.9 32.9-8.4
                                    47.4-15.9L224 480v2.6c0 16.2 13.2 29.4 29.4 29.4c1.7 0 3.4-.1 5.1-.5C344 495 396.4
                                    409.7 381.5 322.7c-2.9-17-8.4-32.9-15.9-47.4L480 288h2.6c16.2 0 29.4-13.2
                                    29.4-29.4c0-1.7-.1-3.4-.5-5.1C495 168 409.7 115.6 322.7 130.5c-17 2.9-32.9 8.4-47.4
                                    15.9L288 32V29.4C288 13.2 274.8 0 258.6 0zM256 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                                </svg>
                                Turbines
                            </Link>
                        </li>
                        <li>
                            <Link href={route('component.index')} className="text-gray-700 dark:text-gray-300
                                                                          hover:text-gray-900 dark:hover:text-gray-200">
                                <i className={"fa fa-gears text-m pr-4"}></i>Components
                            </Link>
                        </li>
                        <li>
                            <Link href={route('inspection.index')} className="text-gray-700 dark:text-gray-300
                                                                          hover:text-gray-900 dark:hover:text-gray-200">
                                <i className={"fa fa-search text-m pr-5"}></i>Inspections
                            </Link>
                        </li>
                        <li>
                            <Link href={route('manufacturer.index')} active className="text-gray-700 dark:text-gray-300
                                                                          hover:text-gray-900 dark:hover:text-gray-200 ">
                                <i className={"fa fa-gears text-m pr-4"}></i>Manufacturers
                            </Link>
                        </li>
                    </ul>
                    <ul className={"space-y-6 py-12"}>
                        <div className="px-4">

                        </div>
                        <li className={"self-end"}>
                            <Link href={route('profile.edit')} className="text-gray-400 dark:text-gray-100
                                                                      hover:text-gray-900 dark:hover:text-gray-200">
                                <div
                                    className="font-medium text-base text-gray-800 dark:text-gray-200">
                                    {auth.user.name}
                                </div>
                                <div
                                    className="font-medium text-sm text-gray-500">{auth.user.email}</div>
                            </Link>
                        </li>
                        <li>
                            <Link href={route('logout')} method="post" as="button" className="text-red-600 dark:text-red-400
                                                                                          hover:text-red-800
                                                                                          dark:hover:text-red-300">
                                Log Out
                            </Link>
                        </li>
                    </ul>
                </div>


            </div>
        </div>
    );
}

export default Sidebar;
