import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import GradeGraphic from '@/Components/GradeGraphic';
import DateConverter from '@/Components/DateConverter';
import React from 'react';

export default function Show(props) {
    function getShadowClass(grade) {
        switch (grade) {
            case 1:
                return '8,181,212';
            case 2:
                return '33,197,94';
            case 3:
                return '253,224,71';
            case 4:
                return '251,146,60';
            case 5:
                return '239,68,68';
            default:
                return '0,0,0';
        }
    }

    const shadowClass = getShadowClass(props.inspection.grade);

    return (<AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<div className={'inline-flex space-x-8'}>
            <h2>Inspection #{props.inspection.id}</h2>
            <div className={'hidden sm:block space-x-4'}>
                <Link href={'/inspection/edit/' + props.inspection.id}>
                    <i className="fa fa-edit text-2xl"
                       style={{color: '#d5d7dd'}}></i>
                </Link>

            </div>
        </div>}
    >
        <Head title={'Inspection #' + props.inspection.id}/>

        <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="shadow-sm sm:rounded-lg">

                    <div
                        className="grid h-full overflow-y-hidden grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-x-24 gap-y-10 ">
                        <div
                            className={'bg-primary-mid px-6 py-4 h-[14rem] rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'}>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>Component</h3>
                            <p className={'text-4xl text-gray-200 font font-bold mb-6 underline'}>
                                <Link href={`/component/${props.inspection.component.id}`}>
                                    {props.inspection.component.type}
                                </Link>
                            </p>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>From</h3>
                            <Link href={'/turbine/' +
                                props.inspection.component.turbine_id}>
                                <p className={'text-4xl text-gray-200 font font-bold underline'}>Turbine
                                    #{props.inspection.component.turbine_id}</p>
                            </Link>


                        </div>
                        <div
                            className="bg-primary-mid flex justify-center flex-col items-center px-6 py-4 rounded-lg shadow-md"
                            style={{
                                boxShadow: `
                                                      5px 5px rgba(${shadowClass}, 0.4),
                                                      10px 10px rgba(${shadowClass}, 0.3),
                                                      15px 15px rgba(${shadowClass}, 0.2),
                                                      20px 20px rgba(${shadowClass}, 0.1),
                                                      25px 25px rgba(${shadowClass}, 0.05)
                                                    `,
                            }}>
                            <GradeGraphic gradeLevel={props.inspection.grade}
                                          height={'140px'}
                                          className={'pb-3 pt-2'}/>
                            <h3 className={'text-m text-gray-400 font-bold text-center'}>Grade
                                Assigned</h3>
                        </div>
                        <div
                            className={'bg-primary-mid px-6 py-4 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden hover:overflow-visible'}>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>Date</h3>
                            <p className={'text-4xl text-gray-200 font font-bold mb-6'}>
                                <DateConverter date={props.inspection.date}
                                               className={''}></DateConverter>
                            </p>
                        </div>
                        <div
                            className={'bg-primary-mid px-6 h-[14rem] py-4 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden hover:overflow-visible'}>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>Inspection
                                Type</h3>
                            <p className={'text-4xl text-gray-200 font-bold mb-6 '}>
                                   <pre
                                       className={'font-sans'}>{props.inspection.type.charAt(
                                           0).toUpperCase() +
                                       props.inspection.type.slice(1).
                                           replace('_', ' ').
                                           replace(' ', '\n')}
                                   </pre>
                            </p>
                        </div>
                        <div
                            className={'bg-primary-mid px-6 py-4 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden hover:overflow-visible'}>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>Inspector</h3>
                            <p className={'text-4xl text-gray-200 font-bold mb-6 '}>
                    <pre
                        className={'font-sans'}>{props.inspection.user.name.replace(
                        ' ', '\n')}</pre>
                            </p>
                        </div>
                        <div
                            className={'bg-primary-mid px-6 py-4 row-span-2 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden hover:overflow-visible'}>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>Required
                                Maintenance</h3>
                            <p className={'text-lg text-gray-200 font-bold mb-6'}>
                                {props.inspection.req_maintenance}
                            </p>
                        </div>
                        <div
                            className={'bg-primary-mid px-6 h-[14rem] py-4 sm:col-span-2  rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden hover:overflow-visible'}>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>Notes</h3>
                            <p className={'text-lg text-gray-200 font-bold mb-6'}>
                                {props.inspection.notes}
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>);
}
