import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import React from "react";

export default function Show(props) {

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header= {
                        <div className={"inline-flex space-x-8"}>
                            <h2>Manufacturer #{props.manufacturer.id}</h2>
                            <Link href={`/manufacturer/edit/${props.manufacturer.id}`}><i className="fa fa-edit text-2xl" style={{color:"#d5d7dd"}}></i></Link>
                        </div>
                    }
        >
            <Head title={"Manufacturer #" + props.manufacturer.id} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="shadow-sm sm:rounded-lg">

                        <div className="grid h-full overflow-y-hidden grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-x-24 gap-y-10 ">
                            <div className={"bg-primary-mid px-6 py-4 h-[14rem] rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"}>
                                <h3 className={"text-m text-gray-400 font-bold mb-2"}>Name</h3>
                                <p className={"text-4xl text-gray-200 font font-bold mb-6"}>
                                    {props.manufacturer.name}
                                </p>

                            </div>
                            <div className="bg-primary-mid px-6 py-4 rounded-lg shadow-md"
                                 >

                                <h3 className={"text-m text-gray-400 font-bold"}>Turbines Count</h3>
                                <p className={"text-8xl text-gray-200 font font-bold mt-6"}>
                                    {props.manufacturer.turbines.length}
                                </p>
                            </div>
                            <div className={"bg-primary-mid px-6 py-4 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden hover:overflow-visible"}>
                                <h3 className={"text-m text-gray-400 font-bold mb-2"}>Components Count</h3>
                                <p className={"text-8xl text-gray-200 font font-bold mt-6"}>
                                    {props.manufacturer.components.length}
                                </p>
                            </div>
                            <div className={"bg-primary-mid col-span-2 row-span-2 h-[28rem] rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden hover:overflow-visible"}>
                                MAP
                            </div>

                            <div className={"bg-primary-mid px-6 py-4 row-span-2 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden hover:overflow-visible"}>
                                <h3 className={"text-m text-gray-400 font-bold mb-2"}>Phone Number</h3>
                                <p className={"text-xl text-gray-200 font font-bold mb-6"}>
                                    {props.manufacturer.phone_number}
                                </p>
                                <h3 className={"text-m text-gray-400 font-bold mb-2"}>Email</h3>
                                <p className={"text-xl text-gray-200 font font-bold mb-6"}>
                                    {props.manufacturer.email}
                                </p>
                                <h3 className={"text-m text-gray-400 font-bold mb-2"}>Address</h3>
                                <p className={"text-xl text-gray-200 font font-bold mb-6"}>
                                    {props.manufacturer.address}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
