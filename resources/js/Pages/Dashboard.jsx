import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, {useCallback, useState} from 'react';
import ReactMapGl from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Marker, Popup} from 'react-map-gl';
import TurbineSvg from '@/Components/TurbineSvg';
import {Link} from '@inertiajs/react';

export default function Dashboard(props) {
    const [selectedFarm, setSelectedFarm] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: 49.5,
        longitude: -4.0000,
        width: '400px',
        height: '200px',
        zoom: 3,
    });

    return (<AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<h2>Dashboard</h2>}
    >

        <div className="py-6">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="shadow-sm sm:rounded-lg">

                    <div
                        className="grid h-full overflow-y-hidden grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-x-24 gap-y-10 ">
                        <div
                            className={'bg-primary-mid px-6 h-[14rem] py-4 col-span-2 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden hover:overflow-visible'}>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>Turbines
                                Needing Attention</h3>
                            <div
                                className={'flex flex-row space-x-7 w-full overflow-x-scroll h-[11rem] whitespace-nowrap overflow-y-hidden scrollbar'}>
                                {props.turbines_needing_attention ?
                                    (props.turbines_needing_attention.map((turbine) => (<Link
                                        href={`/turbine/${turbine.turbine_id}`}>
                                        <div
                                            className={'bg-primary-light h-[9rem] py-4 px-6 text-center rounded-lg '}>
                                            <div key={turbine.turbine_id}>
                                                <p className={'text-sm text-gray-300 font-bold mb-4'}>Turbine
                                                    #{turbine.turbine_id}</p>
                                                {turbine.components_low_grade &&
                                                    turbine.components_low_grade.map(
                                                        (component) => ((component.grade === 4) ?
                                                            <p key={component.component_id}
                                                               className={'text-sm text-orange-300 font-bold'}>Poor {component.type}</p> :
                                                            <p key={component.component_id}
                                                               className={'text-sm text-red-300 font-bold'}>Broken/Missing {component.type}</p>))}
                                            </div>
                                        </div>
                                    </Link>))) :
                                    <p className={'text-white text-3xl font-bold text-center'}>Nothing
                                        to show</p>}
                            </div>
                        </div>
                        <div
                            className="bg-primary-mid px-6 py-4 h-[14rem] rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>Avg.
                                Produced Power p/Hour</h3>
                        </div>
                        <div
                            className={'bg-primary-mid row-span-2 col-span-2 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden hover:overflow-visible'}>
                            <ReactMapGl   {...viewport}
                                          className={'bg-primary-dark'}
                                          mapLib={import('mapbox-gl')}
                                          mapboxAccessToken={props.mapbox_api_token}
                                          onMove={evt => {
                                              setViewport(evt.viewport);
                                          }}
                                          mapStyle={'mapbox://styles/brunog/cllm8sr3w013701qparz97s1z'}
                            >
                                {props.farms.map((farm) => (
                                    <Marker longitude={farm.longitude}
                                            latitude={farm.latitude}>
                                        <button className={'marker-btn'}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSelectedFarm(farm);
                                                }}>
                                            <TurbineSvg/>
                                        </button>
                                    </Marker>))}
                                {selectedFarm ?
                                    (<Popup latitude={selectedFarm.latitude}
                                            longitude={selectedFarm.longitude}
                                            anchor="bottom-right"
                                            onClose={() => setSelectedFarm(
                                                null)}>
                                        <div>
                                            <h4 className={'text-md font-bold'}>{selectedFarm.name} Farm</h4>
                                            <Link
                                                href={`/farm/${selectedFarm.id}`}>Check
                                                Farm</Link>

                                        </div>
                                    </Popup>) :
                                    null}
                            </ReactMapGl>

                        </div>
                        <div
                            className={'bg-primary-mid px-6 h-[14rem] py-4 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden hover:overflow-visible'}>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}>Top
                                Farms Produced Energy p/Hour</h3>
                        </div>
                        <div
                            className={'bg-primary-mid px-6 py-4 h-[14rem] rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden hover:overflow-visible'}>
                            <h3 className={'text-m text-gray-400 font-bold mb-2'}></h3>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>);
}
