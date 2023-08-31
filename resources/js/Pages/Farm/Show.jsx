import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import DateConverter from '@/Components/DateConverter';
import ReactMapGl, {Marker} from 'react-map-gl';
import TurbineSvg from '@/Components/TurbineSvg';

export default function Show(props) {

  return (<AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={<div className={'inline-flex space-x-8'}>
        <h2>Farm #{props.farm.id}</h2>
        <div className={'hidden sm:block space-x-4'}>
          <Link href={'/farm/edit/' + props.farm.id}>
            <i className="fa fa-edit text-2xl"
               style={{color: '#d5d7dd'}}></i>
          </Link>
        </div>
      </div>}
  >
    <Head title={props.farm.name + ' Farm'}/>

    <div className="py-6">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="shadow-sm sm:rounded-lg">

          <div
              className="grid h-full overflow-y-hidden grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-3 grid-rows-1 gap-x-24 gap-y-10 ">
            <div
                className={'bg-primary-mid px-6 py-4 h-[14rem] rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]'}>
              <h3 className={'text-m text-gray-400 font-bold mb-2'}>Farm</h3>
              <p className={'text-4xl text-gray-200 font font-bold mb-6'}>
                {props.farm.name}
              </p>


            </div>
            <div
                className="bg-primary-mid px-6 py-4 rounded-lg shadow-md"
            >

              <h3 className={'text-m text-gray-400 font-bold mb-2'}>Number
                of Turbines</h3>
              <p className={'text-6xl text-gray-200 font font-bold mb-6'}>
                {props.farm.turbines.length}
              </p>
            </div>
            <div
                className={'bg-primary-mid px-6 py-4 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden hover:overflow-visible'}>
              <h3 className={'text-m text-gray-400 font-bold mb-2'}>Avg.
                Generated Power per Hour</h3>
              <p className={'text-4xl text-gray-200 font font-bold mb-6'}>
                {props.farm.turbines.length}
              </p>
              <h3 className={'text-m text-gray-400 font-bold mb-2'}>Current
                Wind Speed</h3>
              <p className={'text-4xl text-gray-200 font font-bold mb-6'}>
                {props.farm.turbines.length}
              </p>

            </div>
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
                className={'row-span-2 rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden hover:overflow-visible'}>
              <ReactMapGl
                  mapLib={import('mapbox-gl')}
                  mapboxAccessToken={props.mapbox_api_token}
                  initialViewState={{
                    longitude: props.farm.longitude,
                    latitude: props.farm.latitude,
                    zoom: 6,
                  }}
                  mapStyle={'mapbox://styles/brunog/cllm8sr3w013701qparz97s1z'}
              >
                <Marker longitude={props.farm.longitude}
                        latitude={props.farm.latitude}>
                  <button className={'marker-btn'}
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedFarm(farm);
                          }}>
                    <TurbineSvg/>
                  </button>
                </Marker>
              </ReactMapGl>
            </div>
            <div
                className={'bg-primary-mid px-6 py-4 h-[14rem] sm:col-span-2  rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-y-scroll scrollbar'}>
              <h3 className={'text-m text-gray-400 font-bold mb-2'}>Turbines
                List</h3>
              <div>
                <table className={'w-full'}>
                  <thead
                      className={'text-left text-gray-400'}>
                  <tr>
                    <th>#</th>
                    <th>Is Active?</th>
                    <th>Avg. Generated per Hour</th>
                    <th>Started At</th>
                  </tr>
                  </thead>
                  <tbody>
                  {props.farm.turbines.map((item, index) => (

                      <tr className={'odd:bg-primary-light text-gray-300 py-6'}
                          key={index}>
                        <td className={'p-2'}><Link
                            href={'/turbine/' + item.id}>{item.id}</Link>
                        </td>
                        <td><Link href={'/turbine/' + item.id}>{item.is_active ?
                            'Yes' :
                            'No'}</Link>
                        </td>
                        <td><Link
                            href={'/turbine/' + item.id}>5
                          kW</Link>
                        </td>
                        <td><Link href={'/turbine/' + item.id}><DateConverter
                            date={item.started_at}></DateConverter></Link>
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
