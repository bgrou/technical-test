import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import React from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SubmitButton from '@/Components/SubmitButton';
import TextInput from '@/Components/TextInput';

export default function Edit(props) {
    const {data, setData, post, processing, errors} = useForm({
        name: ""
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('farm.create'));
    };

    const handleOnChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    return (<AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<div className={'inline-flex space-x-6'}>
            <h2>Create Farm</h2>
        </div>}
    >
        <Head title={'Create Farm'}/>
        <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div
                    className="bg-primary-mid px-6 py-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] sm:rounded-lg">

                    <form onSubmit={submit}>
                        <div className="mt-6">
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={handleOnChange}
                                className="mt-1 block w-3/4"
                                isFocused
                                placeholder="Name"
                            />

                            <InputError message={errors.name} className="mt-2" />
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
