import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import React from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SubmitButton from '@/Components/SubmitButton';
import TextInput from '@/Components/TextInput';

export default function Create(props) {

    const {data, setData, post, processing, errors} = useForm({
        name: "",
        phone_number: "",
        email: "",
        address: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('manufacturer.store'));
    };

    const handleOnChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    return (<AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<div className={'inline-flex space-x-6'}>
            <h2>Create Manufacturer</h2>
        </div>}
    >
        <Head title={'Create Manufacturer'}/>
        <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div
                    className="bg-primary-mid px-6 py-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] sm:rounded-lg">

                    <form onSubmit={submit}>
                        <div className={'mb-4'}>
                            <InputLabel htmlFor="name" value="Name"/>

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="bg-primary-dark mb-3 border-0 sm:rounded-lg text-gray-300 mt-1 block w-full"
                                onChange={handleOnChange}
                            />

                            <InputError message={errors.name}
                                        className="mt-2"/>
                        </div>

                        <div className={'mb-4'}>
                            <InputLabel htmlFor="phone_number" value="Phone Number"/>

                            <TextInput
                                id="phone_number"
                                name="phone_number"
                                value={data.phone_number}
                                className="bg-primary-dark mb-3 border-0 sm:rounded-lg text-gray-300 mt-1 block w-full"
                                onChange={handleOnChange}
                            />

                            <InputError message={errors.phone_number}
                                        className="mt-2"/>
                        </div>

                        <div className={'mb-4'}>
                            <InputLabel htmlFor="email" value="Email"/>

                            <TextInput
                                id="email"
                                name="email"
                                value={data.email}
                                className="bg-primary-dark mb-3 border-0 sm:rounded-lg text-gray-300 mt-1 block w-full"
                                onChange={handleOnChange}
                            />

                            <InputError message={errors.email}
                                        className="mt-2"/>
                        </div>

                        <div className={'mb-20'}>
                            <InputLabel htmlFor="address" value="Address"/>

                            <TextInput
                                id="address"
                                name="address"
                                value={data.address}
                                className="bg-primary-dark mb-3 border-0 sm:rounded-lg text-gray-300 mt-1 block w-full"
                                onChange={handleOnChange}
                            />

                            <InputError message={errors.address}
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
