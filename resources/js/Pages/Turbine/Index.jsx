import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from "@/Components/DataTable";

export default function Index(props) {

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2>Turbines</h2>}
        >
            <Head title="Turbines" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-primary-mid overflow-hidden shadow-sm sm:rounded-lg">
                        <DataTable
                            fetchUrl="/turbines/fetch"
                            columns={['id', 'farm_id', 'manufacturer_id', 'capacity', 'is_active', 'started_at']}
                        ></DataTable>

                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
