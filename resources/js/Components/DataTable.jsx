import {debounce} from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import Paginator from './Paginator';
import {Link} from '@inertiajs/react';
import DateConverter from '@/Components/DateConverter';
import _ from 'lodash';

const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

const DataTable = ({columns, fetchUrl}) => {
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState();
  const [sortOrder, setSortOrder] = useState('desc');
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState('id');
  const [loading, setLoading] = useState(true);

  const handleSort = (column) => {
    if (column === sortColumn) {
      sortOrder === SORT_ASC ? setSortOrder(SORT_DESC) : setSortOrder(SORT_ASC);
    } else {
      setSortColumn(column);
      setSortOrder(SORT_ASC);
    }
  };

  const handleSearch = useRef(debounce((query) => {
    setSearch(query);
    setCurrentPage(1);
    setSortOrder(SORT_ASC);
    setSortColumn(columns[0]);
  }, 500)).current;

  const handlePerPage = (perPage) => {
    setCurrentPage(1);
    setPerPage(perPage);
  };

  const handleSearchFilter = (searchFilter) => {
    setSearchFilter(searchFilter);
  };

  const deleteObject = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
        await axios.delete(
            '/' + fetchUrl.split('/')[1].replace(/s$/, '') + '/delete/' + id);
    }
  };

  const loaderStyle = {width: '4rem', height: '4rem'};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = {
        search,
        sort_field: sortColumn,
        sort_order: sortOrder,
        per_page: perPage,
        page: currentPage,
        search_filter: searchFilter,
      };
      const {data} = await axios(fetchUrl, {params});
      setData(data.data);
      setPagination(data.meta);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    };

    fetchData();
  }, [perPage, sortColumn, sortOrder, search, currentPage]);

  return (<div>
    {/* Search per page starts */}
    <div className="">
      <div className="flex justify-between bg-primary-dark pb-4">
        <div className="w-1/4">
          <div className="flex items-center">
            <input
                className="w-full px-3 py-2 border border-white border-2 text-white bg-primary-mid rounded-md focus:outline-none focus:border-secondary-mid"
                placeholder="Search..."
                type="search"
                onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="">
          <div className="flex text-gray-400 items-center">
            <select
                className="form-select bg-primary-light border-0"
                value={searchFilter}
                onChange={(e) => handleSearchFilter(e.target.value)}
            >
              {columns.map((column) => (<option value={column}>
                {column.toUpperCase().replace('_', ' ')}
              </option>))}
            </select>
          </div>
        </div>
        <div className="w-1/7">
          <div className="flex text-gray-400 items-center">
            <label className="mt-2 mr-2">Per page</label>
            <select
                className="form-select bg-primary-light border-0"
                value={perPage}
                onChange={(e) => handlePerPage(e.target.value)}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    {/* Search per page ends */}
    <div className="tableFixHead">
      <table className="table-auto w-full">
        <thead className="bg-primary-light text-sm text-gray-300 text-left">
        <tr>
          {columns.map((column) => (<th
              key={column}
              onClick={() => handleSort(column)}
              className="px-4 py-2 cursor-pointer"
          >
            {column.toUpperCase().replace('_', ' ')}
            {column === sortColumn ? (<span>
                                        {sortOrder === SORT_ASC ? (<svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 inline-block"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                          <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M4 6h16M4 12h16M4 18h16"
                                          />
                                        </svg>) : (<svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 inline-block"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                          <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M6 18L18 6M6 6l12 12"
                                          />
                                        </svg>)}
                                    </span>) : null}
          </th>))}
          <th></th>
        </tr>
        </thead>
        <tbody>
        {data.length === 0 ? (<tr>
          <td colSpan={columns.length}
              className="text-center text-white py-4">
            No items found
          </td>
        </tr>) : ('')}

        {!loading ? (data.map((d, index) => {

          return (<tr className={'even:bg-primary-light'} key={index}>
            {columns.map((column) => {
              const value = column.includes('.') ? _.get(d, column) : d[column];
              const needDateConversion = column.includes('date') ||
                  column.includes('_at');

              return (<td key={column}
                          className="px-4 py-2 text-gray-100">
                {needDateConversion ? <DateConverter date={value}/> : value}
              </td>);
            })}

            <td className={'px-6 space-x-2'}>
              <Link href={'/' + fetchUrl.split('/')[1].replace(/s$/, '') + '/' +
                  d['id']}>
                <i className="fa fa-eye text-lg"
                   style={{color: '#d5d7dd'}}></i>
              </Link>
              <Link href={'/' + fetchUrl.split('/')[1].replace(/s$/, '') +
                  '/edit/' + d['id']}>
                <i className="fa fa-edit text-lg"
                   style={{color: '#d5d7dd'}}></i>
              </Link>
              <Link href={"#"} onClick={() => deleteObject(d['id'])}
                    className="cursor-pointer">
                  <i className="fa fa-trash text-lg"
                     style={{color: '#ff7f7f'}}></i>
              </Link>
            </td>
          </tr>);
        })) : (<tr>
          <td colSpan={columns.length + 1} className="text-center py-4">
            <div className="spinner-border" style={loaderStyle}
                 role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </td>
        </tr>)}
        </tbody>
      </table>
    </div>
    {data.length > 0 && !loading ? (<div className="mt-2">
      <Paginator
          pagination={pagination}
          pageChanged={(page) => setCurrentPage(page)}
          totalItems={data.length}
      />
    </div>) : null}
  </div>);
};

export default DataTable;
