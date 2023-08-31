import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import DataTable from '@/Components/DataTable';

export default function Index(props) {

    return (<AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<div className={'flex flex-row space-x-4'}>
            <h2>Turbines</h2>
            <Link href={'/turbine/create'}>
                <p className={'text-lg text-green-400'}><i
                    className={'fa fa-plus'}></i> New</p>
            </Link>
        </div>}
    >
        <Head title="Turbines"/>

        <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div
                    className="bg-white dark:bg-primary-mid overflow-hidden shadow-sm sm:rounded-lg">
                    <DataTable
                        fetchUrl="/turbines/fetch"
                        columns={[
                            'id',
                            'farm_id',
                            'manufacturer_id',
                            'capacity',
                            'is_active',
                            'started_at']}
                    ></DataTable>

                </div>
            </div>
        </div>

    </AuthenticatedLayout>);
}
