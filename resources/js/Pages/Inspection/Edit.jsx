import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import React, {useState} from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import DatePicker from 'react-datepicker';
import {format, parseISO} from 'date-fns';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import SubmitButton from '@/Components/SubmitButton';

export default function Edit(props) {
    const [startDate, setStartDate] = useState(parseISO(props.inspection.date));

    const {data, setData, post, processing, errors} = useForm({
        id: props.inspection.id,
        type: props.inspection.type,
        grade: props.inspection.grade,
        date: parseISO(props.inspection.date),
        user_id: props.inspection.user_id,
        notes: props.inspection.notes,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('inspection.update'));
    };

    const handleOnChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const transformedUsers = props.users_list.map(user => ({
        value: user.id,
        label: user.name,
    }));

    const transformedTypes = props.type_values.map(type => ({
        value: type,
        label: type,
    }));

    const transformedGrades = props.grade_values.map(grade => ({
        value: grade,
        label: grade,
    }));

    return (<AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<div className={'inline-flex space-x-6'}>
            <h2>Edit Inspection #{props.inspection.id}</h2>
        </div>}
    >
        <Head title={'Edit Inspection #' + props.inspection.id}/>
        <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div
                    className="bg-primary-mid px-6 py-4 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] sm:rounded-lg">

                    <form onSubmit={submit}>
                        <SelectInput
                            id="type"
                            name="type"
                            value={data.type}
                            label={'Type'}
                            options={transformedTypes}
                            onChange={handleOnChange}
                            error={errors.type}
                        />
                        <SelectInput
                            id="grade"
                            name="grade"
                            value={data.grade}
                            label={'Grade'}
                            options={transformedGrades}
                            onChange={handleOnChange}
                            error={errors.grade}
                        />
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
                            />
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
                            onChange={handleOnChange}
                            error={errors.notes}
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
