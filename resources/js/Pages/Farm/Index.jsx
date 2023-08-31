import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import React from 'react';

export default function Index(props) {

    return (<AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<div className={'flex flex-row space-x-4'}>
            <h2>Farms</h2>
            <Link href={'/farm/create'}>
                <p className={'text-lg text-green-400'}><i
                    className={'fa fa-plus'}></i> New</p>
            </Link>
        </div>}
    >
        <Head title="Farms"/>

        <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div
                    className="bg-white dark:bg-primary-mid overflow-hidden shadow-sm sm:rounded-lg">
                    <DataTable
                        fetchUrl="/farms/fetch"
                        columns={[
                            'id', 'name', 'latitude', 'longitude']}
                    ></DataTable>

                </div>
            </div>
        </div>

    </AuthenticatedLayout>);
}
