import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Pagination } from 'react-bootstrap'
import { FaPencilAlt, FaSearch, FaTrash } from 'react-icons/fa'
import Loading from '../../components/Loading'
import { getRequisitions } from '../../features/requisition/requisitionSlice'
import { currency } from '../../utils'

const RequisitionList = () => {
    const dispatch = useDispatch();
    const { requisitions, pager, isLoading } = useSelector(state => state.requisition);
    const [apiEndpoint, setApiEndpoint] = useState('');

    useEffect(() => {
        if (apiEndpoint === '') {
            dispatch(getRequisitions({ url: `/api/requisitions/search` }));
        } else {
            dispatch(getRequisitions({ url: apiEndpoint }));
        }
    }, [dispatch, apiEndpoint])

    const handlePageClick = (url) => {
        console.log(url);
        setApiEndpoint(url);
    };

    const handleDelete = (id) => {

    };

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>จัดซื้อจัดจ้าง</Breadcrumb.Item>
                <Breadcrumb.Item active>รายการคำขอ</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">รายการคำขอ</h2>
                    <Link to="add" className="btn btn-primary">เพิ่มคำขอ</Link>
                </div>

                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th className="text-center w-[15%]">เอกสาร</th>
                                <th>รายการ</th>
                                <th className="text-center w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading && (
                                <tr>
                                    <td className="text-center" colSpan={4}><Loading /></td>
                                </tr>
                            )}
                            {(!isLoading && requisitions) && requisitions.map((requisition, index) => (
                                <tr key={requisition.id}>
                                    <td className="text-center">{pager && pager.from + index}</td>
                                    <td className="text-sm">
                                        <p>เลขที่ <span className="font-bold">{requisition.pr_no}</span></p>
                                        <p>วันที่ <span className="font-bold">{requisition.pr_date}</span></p>
                                    </td>
                                    <td className="text-sm">
                                        <p>{requisition.category.name} จำนวน {requisition.item_count} รายการ</p>
                                        <p>เป็นเงินทั้งสิ้น {currency.format(requisition.net_total)} บาท</p>
                                    </td>
                                    <td className="text-center">
                                        <Link to="/" className="btn btn-sm btn-info px-1 mr-1">
                                            <FaSearch />
                                        </Link>
                                        <button className="btn btn-sm btn-warning px-1 mr-1">
                                            <FaPencilAlt />
                                        </button>
                                        <button className="btn btn-sm btn-danger px-1" onClick={() => handleDelete(requisition.id)}>
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

export default RequisitionList
