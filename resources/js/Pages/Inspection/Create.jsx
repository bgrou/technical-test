import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import React, {useState} from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import DatePicker from 'react-datepicker';
import {format} from 'date-fns';
import SelectInput from '@/Components/SelectInput';
import SubmitButton from '@/Components/SubmitButton';
import TextAreaInput from '@/Components/TextAreaInput';

export default function Create(props) {
    const [startDate, setStartDate] = useState();

    const {data, setData, post, processing, errors} = useForm({
        component_id: props.component_id,
        type: "Routine",
        grade: "1",
        date: null,
        user_id: 1,
        notes: "",
        req_maintenance: ""
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('inspection.store'));
    };

    const handleOnChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const transformedUsers = props.users_list.map(user => ({
        value: user.id, label: user.name,
    }));


    return (<AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<div className={'inline-flex space-x-6'}>
            <h2>Create Inspection</h2>
        </div>}
    >
        <Head title={'Create Inspection'}/>

        <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div
                    className="bg-primary-mid px-6 py-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] sm:rounded-lg">
                    <form onSubmit={submit}>
                        <div className={'mb-4'}>
                            <InputLabel htmlFor="type" value="Type"/>

                            <select
                                id="type"
                                name="type"
                                value={data.type}
                                className="bg-primary-dark mb-3 border-0 sm:rounded-lg text-gray-300 mt-1 block w-full"
                                autoComplete="type"
                                onChange={handleOnChange}
                            >
                                {props.type_values.map(type => (
                                    <option value={type}>{type}</option>))}
                            </select>
                            <InputError message={errors.type}
                                        className="mt-2"/>
                        </div>
                        <div className={'mb-4'}>
                            <InputLabel htmlFor="grade" value="Grade"/>

                            <select
                                id="grade"
                                name="grade"
                                value={data.grade}
                                className="bg-primary-dark mb-3 border-0 sm:rounded-lg text-gray-300 mt-1 block w-full"
                                autoComplete="grade"
                                onChange={handleOnChange}
                            >
                                {props.grade_values.map(grade => (<option
                                    value={grade}>{grade}</option>))}
                            </select>
                            <InputError message={errors.grade}
                                        className="mt-2"/>
                        </div>
                        <div className={'mb-4'}>
                            <InputLabel htmlFor="date" value="Date"/>

                            <DatePicker
                                className="bg-primary-dark text-gray-300 sm:rounded-lg border-0"
                                selected={startDate}
                                onChange={(date) => {
                                    const formattedDate = format(date,
                                        'yyyy-MM-dd HH:mm:ss');
                                    setData('date', formattedDate);
                                    setStartDate(date);
                                }}
                            ></DatePicker>
                            <InputError message={errors.date}
                                        className="mt-2"/>
                        </div>
                        <SelectInput
                            id="user_id"
                            name="user_id"
                            value={data.user_id}
                            label={'Inspector'}
                            options={transformedUsers}
                            onChange={handleOnChange}
                            error={errors.user_id}
                        />
                        <TextAreaInput
                            id="notes"
                            name="notes"
                            value={data.notes}
                            label={'Notes'}
                            onChange={handleOnChange}
                            error={errors.notes}
                        />
                        <TextAreaInput
                            id="req_maintenance"
                            name="req_maintenance"
                            value={data.req_maintenance}
                            label={'Required Maintenance'}
                            onChange={handleOnChange}
                            error={errors.req_maintenance}
                        />
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
