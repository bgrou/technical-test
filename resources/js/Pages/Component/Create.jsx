import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import React from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import SubmitButton from '@/Components/SubmitButton';

export default function Create(props) {

    const {data, setData, post, processing, errors} = useForm({
        manufacturer_id: 1,
        type: props.type_required,
        turbine_id: props.turbine_id,
        serial_number: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('component.store'));
    };

    const handleOnChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    return (<AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<div className={'inline-flex space-x-6'}>
            <h2>Create Component</h2>
        </div>}
    >
        <Head title={'Create Component'}/>

        <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div
                    className="bg-primary-mid px-6 py-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] sm:rounded-lg">

                    <form onSubmit={submit}>
                        <div className={'mb-4'}>
                            <InputLabel htmlFor="manufacturer_id"
                                        value="Manufacturer"/>

                            <select
                                id="manufacturer_id"
                                name="manufacturer_id"
                                value={data.manufacturer_id}
                                className="bg-primary-dark mb-3 border-0 sm:rounded-lg text-gray-300 mt-1 block w-full"
                                onChange={handleOnChange}
                            >
                                {props.manufacturers_list.map(
                                    manufacturer => (<option
                                        value={manufacturer.id}>{manufacturer.name}</option>))}
                            </select>
                            <InputError message={errors.manufacturer_id}
                                        className="mt-2"/>
                        </div>

                        <div className={'mb-20'}>
                            <InputLabel htmlFor="serial_number"
                                        value="Serial Number"/>

                            <TextInput
                                id="serial_number"
                                name="serial_number"
                                value={data.serial_number}
                                className="bg-primary-dark mb-3 border-0 sm:rounded-lg text-gray-300 mt-1 block w-full"
                                onChange={handleOnChange}
                            />

                            <InputError message={errors.serial_number}
                                        className="mt-2"/>
                        </div>
                        <SubmitButton
                            onClick={submit}
                            className={props.className}
                            processing={processing}
                        />
                    </form>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>);
}
