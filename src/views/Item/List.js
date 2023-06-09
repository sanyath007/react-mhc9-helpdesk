import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Pagination } from 'react-bootstrap';
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa';
import { getItems } from '../../features/item/itemSlice';
import Loading from '../../components/Loading';
import FilteringInputs from '../../components/Item/FilteringInputs'
import { currency } from '../../utils';
import { useGetInitialFormDataQuery } from '../../services/item/itemApi'

const initialFilters = {
    name: '',
    category: ''
};

const initialFormData = {
    units: [],
    categories: [],
};

const ItemList = () => {
    const dispatch = useDispatch();
    const { items, pager, isLoading } = useSelector(state => state.item);
    const { data: formData = initialFormData } = useGetInitialFormDataQuery();

    useEffect(() => {
        dispatch(getItems({ url: `/api/items/search` }));
    }, [dispatch]);

    const handlePageClick = (url) => {

    };

    const handleFilter = (queryStr) => {

    };

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item active>รายการสินค้า/บริการ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รายการสินค้า/บริการ</h2>
                    <Link to="add" className="btn btn-primary">เพิ่มสินค้า/บริการใหม่</Link>
                </div>
                <div className="mt-2">
                    <FilteringInputs
                        initialFilters={initialFilters}
                        formData={formData}
                        onFilter={handleFilter}
                    />

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="w-[5%] text-center">#</th>
                                <th>ชื่อสินค้า/บริการ</th>
                                <th className="w-[15%] text-center">ราคา</th>
                                <th className="w-[10%] text-center">สถานะ</th>
                                <th className="w-[10%] text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && (
                                <tr>
                                    <td className="text-center" colSpan={4}><Loading /></td>
                                </tr>
                            )}
                            {(!isLoading && items.length > 0) && items.map((item, index) => (
                                <tr key={item.id} className="text-sm">
                                    <td className="text-center">{pager && pager.from+index}</td>
                                    <td>
                                        <p>{item.category.name}</p>
                                        <p className="font-thin">{item.name}</p>
                                    </td>
                                    <td className="text-center">{currency.format(item.price)}</td>
                                    <td className="text-center"></td>
                                    <td className="text-center">
                                        <Link to="" className="btn btn-outline-primary btn-sm px-1">
                                            <FaSearch />
                                        </Link>
                                        <Link to="" className="btn btn-outline-warning btn-sm px-1 m-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button type="button" className="btn btn-outline-danger btn-sm px-1">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {(pager && pager.last_page > 1) && (
                        <Pagination>
                            <Pagination.First disabled={pager.current_page === 1} onClick={() => handlePageClick(pager.first_page_url)} />
                            <Pagination.Prev disabled={!pager.prev_page_url} onClick={() => handlePageClick(pager.prev_page_url)} />
                            {/* <Pagination.Item>{1}</Pagination.Item>
                            <Pagination.Ellipsis />

                            <Pagination.Item>{10}</Pagination.Item>
                            <Pagination.Item>{11}</Pagination.Item>
                            <Pagination.Item active>{12}</Pagination.Item>
                            <Pagination.Item>{13}</Pagination.Item>
                            <Pagination.Item disabled>{14}</Pagination.Item>

                            <Pagination.Ellipsis />
                            <Pagination.Item>{20}</Pagination.Item> */}
                            <Pagination.Next disabled={!pager.next_page_url} onClick={() => handlePageClick(pager.next_page_url)} />
                            <Pagination.Last disabled={pager.current_page === pager.last_page} onClick={() => handlePageClick(pager.last_page_url)} />
                        </Pagination>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ItemList