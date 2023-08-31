import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import GradeGraphic from '@/Components/GradeGraphic';
import DateConverter from '@/Components/DateConverter';
import Dropdown from '@/Components/Dropdown';
import React, {useState} from 'react';

export default function Show(props) {

    const inspectionsList = [];
    const [components, setComponents] = useState(props.turbine.components);
    const deleteComponent = async (e, id) => {
        if(confirm("Are you sure you want to delete the component?")) {
            const res = await axios.delete(`/component/delete/${id}`);
            if (res.data.status === 200) {
                const updatedComponents = components.filter(comp => comp.id !== id);
                setComponents(updatedComponents);
            }
        }
    };

    props.turbine.components.forEach((component) => {
        component.inspections.forEach((inspection) => {
            inspectionsList.push({
                id: inspection.id,
                date: inspection.date,
                type: inspection.type,
                componentType: component.type,
                grade: inspection.grade,
            });
        });
    });

    inspectionsList.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB - dateA;
    });
    console.log(props.components_low_grade);
    return (<AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<div className={'inline-flex space-x-8'}>
            <h2>Turbine #{props.turbine.id}</h2>
            <p className={'text-sm text-green-500'}>{(props.turbine.is_active ?
                <p className={'text-sm text-green-400'}>Active</p> :
                <p className={'text-sm text-red-400'}>Disabled</p>)}</p>
            <Link href={`/turbine/edit/${props.turbine.id}`}>
                <div className={'space-x-4'}>
                    <i className="fa fa-edit text-2xl"
                       style={{color: '#d5d7dd'}}></i>
                </div>
            </Link>
        </div>}
    >
        <Head title={'Turbine #' + props.turbine.id}/>

        <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="shadow-sm sm:rounded-lg">

                    <div
                        className="grid h-full overflow-y-hidden grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-x-24 gap-y-10 ">
                        <div
                            className={'bg-primary-mid px-6 py-4 h-[14rem] rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'}>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>Turbine</h3>
                            <p className={'text-4xl text-gray-200 font font-bold mb-6'}>
                                #{props.turbine.id}
                            </p>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>From
                                Farm</h3>
                            <Link href={`/farm/${props.turbine.farm.id}`}>
                                <p className={'text-3xl text-gray-200 font font-bold underline'}>{props.turbine.farm.name}</p>
                            </Link>
                        </div>
                        <div
                            className="bg-primary-mid flex row-span-2 flex-col shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] row-items-center px-6 py-4 rounded-lg">
                            <h3 className={'text-m text-gray-400 font-bold mb-8'}>Components
                            </h3>

                            {props.component_types.map((type) => {
                                const component = props.turbine.components.find(
                                    comp => comp.type === type);

                                if (component) {
                                    return (<Dropdown>
                                        <Dropdown.Trigger>
                                            <div
                                                className={'bg-primary-light hover:cursor-pointer flex h-20 flex-row mb-4 row-items-center align-center justify-between px-6 py-4 rounded-lg shadow-md'}>
                                                <p className={'text-3xl flex items-center text-gray-200 font font-bold'}>
                                                    {component.type.charAt(0).
                                                            toUpperCase() +
                                                        component.type.slice(1)}
                                                </p>
                                                <div
                                                    className={'flex-row flex space-x-4 items-center'}>
                                                    <GradeGraphic
                                                        gradeLevel={(component.latest_inspection) ?
                                                            component.latest_inspection.grade :
                                                            0}
                                                        height={'50px'}/>
                                                    <p className={'text-lg'}>
                                                    <span
                                                        className="inline-flex rounded-md">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center py-2 border border-transparent text-sm
                                                                       leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400
                                                                       hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none
                                                                       transition ease-in-out duration-150"
                                                        >
                                                            <i className={'fa fa-caret-right text-white'}></i>

                                                        </button>
                                                    </span>

                                                    </p>
                                                </div>


                                            </div>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content width={'4rem'}>

                                            <Link
                                                href={`/inspection/create/${component.id}`}
                                                className={'text-white space-x-2 hover:cursor-pointer flex flex-row text-sm block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out '}
                                            ><i
                                                className={'fa fa-plus text-white'}></i>
                                                <p>Inspection</p>
                                            </Link>

                                            <Link
                                                href={`/component/${component.id}`}
                                                className={'text-white space-x-2 hover:cursor-pointer flex flex-row text-sm block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out '}
                                            ><i
                                                className={'fa fa-eye text-white'}></i>
                                                <p>See</p>
                                            </Link>

                                            <Link
                                                href={`/component/edit/${component.id}`}
                                                className={'text-white space-x-2 hover:cursor-pointer flex flex-row text-sm block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out '}
                                            ><i
                                                className={'fa fa-edit text-white'}></i>
                                                <p>Edit</p>
                                            </Link>

                                            <Link href={'#'}
                                                  className={'text-white space-x-2 hover:cursor-pointer flex flex-row text-sm block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out '}
                                                  onClick={(e) => deleteComponent(
                                                      e, component.id)}
                                            >
                                                <i className={'fa fa-recycle text-white'}></i>
                                                <p>Remove</p>
                                            </Link>
                                        </Dropdown.Content>
                                    </Dropdown>);
                                } else {
                                    return (<div className="mb-4">
                                        <Link
                                            href={`/component/create/${type}/${props.turbine.id}`}>
                                            <button
                                                className="bg-primary-dark hover:cursor-pointer flex h-20 flex-row w-full justify-center items-center px-6 py-4 rounded-lg shadow-md">
                                                <p className={'text-lg flex items-center text-gray-300 font font-bold'}>
                                                    <i className={'fa fa-plus px-2'}></i> Create {type} Component
                                                </p>
                                            </button>
                                        </Link>
                                    </div>);
                                }
                            })}
                        </div>
                        <div
                            className={'bg-primary-mid px-6 py-4 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden hover:overflow-visible'}>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>Installation
                                Date</h3>
                            <p className={'text-4xl text-gray-200 font font-bold mb-6'}>
                                <DateConverter
                                    date={props.turbine.started_at}
                                    className={'text-3xl'}></DateConverter>
                            </p>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>Manufacturer</h3>
                            <Link
                                href={`/manufacturer/${props.turbine.manufacturer.id}`}>
                                <p className={'text-4xl text-gray-200 font font-bold mb-6 underline'}>
                                    {props.turbine.manufacturer.name}
                                </p>
                            </Link>

                        </div>
                        <div
                            className={'bg-primary-mid px-6 py-4 h-[14rem] rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden hover:overflow-visible'}>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>Power
                                capacity</h3>
                            <p className={'text-4xl text-gray-200 font-bold mb-6 '}>
                                {props.turbine.capacity} kW
                            </p>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>Generated
                                Power</h3>
                            <p className={'text-4xl text-gray-200 font-bold mb-6 '}>
                                {props.turbine.capacity} kW
                            </p>
                        </div>

                        <div
                            className={'bg-primary-mid px-6 py-4 row-span-2 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden hover:overflow-visible'}>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>Power
                                Generation by Day</h3>
                        </div>
                        <div
                            className={'bg-primary-mid px-6 py-4 h-[14rem] sm:col-span-2  rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-y-scroll scrollbar'}>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>Inspection
                                History</h3>
                            <div>
                                <table className={'w-full'}>
                                    <thead
                                        className={'text-left text-gray-400'}>
                                    <tr>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Component Type</th>
                                        <th>Grade</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {inspectionsList.map((item, index) => (

                                        <tr className={'odd:bg-primary-light text-gray-300 py-6'}
                                            key={index}>
                                            <td className={'p-2'}><Link
                                                href={'/inspection/' + item.id}><DateConverter
                                                date={item.date}></DateConverter></Link>
                                            </td>
                                            <td><Link href={'/inspection/' +
                                                item.id}>{item.type}</Link>
                                            </td>
                                            <td><Link href={'/inspection/' +
                                                item.id}>{item.componentType}</Link>
                                            </td>
                                            <td><Link href={'/inspection/' +
                                                item.id}>{item.grade}</Link>
                                            </td>
                                        </tr>))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>);
}
