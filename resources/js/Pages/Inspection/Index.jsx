import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import React from 'react';

export default function Index(props) {

    return (<AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<div className={'flex items-center space-x-8'}>
            <h2>Inspections</h2>
        </div>}
    >
        <Head title="Inspections"/>

        <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div
                    className="bg-white dark:bg-primary-mid overflow-hidden shadow-sm sm:rounded-lg">
                    <DataTable
                        fetchUrl="/inspections/fetch"
                        columns={[
                            'id',
                            'type',
                            'component_id',
                            'grade',
                            'date',
                            'user.name']}
                    ></DataTable>

                </div>
            </div>
        </div>

    </AuthenticatedLayout>);
}
