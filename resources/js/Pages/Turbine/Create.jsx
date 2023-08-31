import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import React from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import DatePicker from 'react-datepicker';
import SelectInput from '@/Components/SelectInput';
import SubmitButton from '@/Components/SubmitButton';

export default function Create(props) {

    const {data, setData, post, processing, errors} = useForm({
        farm_id: 1,
        manufacturer_id: 1,
        capacity: 0,
        is_active: true,
        started_at: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('turbine.store'));
    };

    const handleOnChange = (e) => {
        if (e.target.type === 'checkbox') {
            setData(e.target.name, e.target.checked);
        } else {
            setData(e.target.name, e.target.value);
        }
    };

    const transformedFarms = props.farms_list.map(farm => ({
        value: farm.id, label: farm.name,
    }));

    const transformedManufacturers = props.manufacturers_list.map(
        manufacturer => ({
            value: manufacturer.id, label: manufacturer.name,
        }));

    return (<AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<div className={'inline-flex space-x-6'}>
            <h2>Create Turbine</h2>
        </div>}
    >
        <Head title={'Create Turbine'}/>

        <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div
                    className="bg-primary-mid px-6 py-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] sm:rounded-lg">
                    <form onSubmit={submit}>
                        <SelectInput
                            id="farm_id"
                            name="farm_id"
                            value={data.farm_id}
                            label={'Farm'}
                            options={transformedFarms}
                            onChange={handleOnChange}
                            error={errors.farm_id}
                        />
                        <SelectInput
                            id="manufacturers_id"
                            name="manufacturers_id"
                            value={data.manufacturers_id}
                            label={'Manufacturer'}
                            options={transformedManufacturers}
                            onChange={handleOnChange}
                            error={errors.manufacturer_id}
                        />

                        <div className={'mb-4'}>
                            <InputLabel htmlFor="capacity"
                                        value="Capacity"/>

                            <TextInput
                                id="capacity"
                                name="capacity"
                                value={data.capacity}
                                type="number"
                                step={'0.01'}
                                className="bg-primary-dark mb-3 border-0 sm:rounded-lg text-gray-300 mt-1 block w-full"
                                onChange={handleOnChange}
                            />

                            <InputError message={errors.capacity}
                                        className="mt-2"/>
                        </div>
                        <div className={'mb-4'}>
                            <InputLabel htmlFor="is_active"
                                        value="Is Active"/>

                            <input
                                type="checkbox"
                                id="is_active"
                                name="is_active"
                                checked={data.is_active}
                                className="bg-red-500 mb-3 border-0 sm:rounded-lg text-green-700 mt-1 block"
                                onChange={handleOnChange}
                            />

                            <InputError message={errors.is_active}
                                        className="mt-2"/>
                        </div>
                        <div className={'mb-4'}>
                            <InputLabel htmlFor="date" value="Started At"/>

                            <DatePicker
                                className="bg-primary-dark text-gray-300 sm:rounded-lg border-0"
                                selected={data.started_at}
                                onChange={(date) => {
                                    setData('started_at', date);
                                    setStartDate(date);
                                }}
                            ></DatePicker>
                            <InputError message={errors.started_at}
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
