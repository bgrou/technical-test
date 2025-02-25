import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import React, {useState} from 'react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SubmitButton from '@/Components/SubmitButton';
import TextInput from '@/Components/TextInput';
import ReactMapGl, {Marker} from 'react-map-gl';
import TurbineSvg from '@/Components/TurbineSvg';

export default function Edit(props) {
    const {data, setData, post, processing, errors} = useForm({
        name: "",
        latitude: "",
        longitude: "",
    });
    const [marker, setMarker] = useState([]);

    const submit = (e) => {
        e.preventDefault();
        post(route('farm.create'));
    };

    const handleOnChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    function onClickMap(event) {
        const {lat, lng} = event.lngLat;
        setMarker({latitude: lat, longitude: lng});
        setData({...data, longitude: lng, latitude: lat});
    }

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
                        <div className={'mt-6'}>
                            <h3 className={'font-medium text-sm text-gray-300 mb-2'}>Select a
                                new place for the Farm</h3>

                            <div className={'w-full h-96 mb-20'}>
                                <ReactMapGl
                                    mapLib={import('mapbox-gl')}
                                    mapboxAccessToken={props.mapbox_api_token}
                                    initialViewState={{
                                        longitude: 49.5,
                                        latitude: -4.0000,
                                        zoom: 3,
                                    }}
                                    onClick={onClickMap}
                                    mapStyle={'mapbox://styles/brunog/cllm8sr3w013701qparz97s1z'}
                                >
                                    {!isNaN(marker.latitude) && !isNaN(marker.longitude) &&
                                        <Marker longitude={marker.longitude}
                                                latitude={marker.latitude}>
                                            <i className={'text-red-500 fa fa-dot-circle-o text-2xl'}></i>
                                        </Marker>}
                                </ReactMapGl>
                              <InputError message={errors.latitude} className="mt-2" />
                              <InputError message={errors.longitude} className="mt-2" />
                            </div>
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
