import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from "@/Components/DataTable";

export default function Index(props) {

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2>Manufacturers</h2>}
        >
            <Head title="Manufacturers" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-primary-mid overflow-hidden shadow-sm sm:rounded-lg">
                        <DataTable
                            fetchUrl="/manufacturers/fetch"
                            columns={["id", "name", "phone_number", "address"]}
                        ></DataTable>

                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
