import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { getComsets } from '../../features/slices/comset/comsetSlice';
import Loading from '../../components/Loading';

const ComsetList = () => {
    const dispatch = useDispatch();
    const { comsets, pager, loading, success } = useSelector(state => state.equipment)

    useEffect(() => {
        dispatch(getComsets());
    }, []);

    console.log(comsets);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item active>อุปกรณ์</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl">อุปกรณ์</h2>
                    <Link to="add" className="btn btn-primary">เพิ่มอุปกรณ์ใหม่</Link>
                </div>

                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center w-[5%]">#</th>
                                <th>รายละเอียด</th>
                                <th className="text-center w-[10%]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={3} className="text-center">
                                        <Loading />
                                    </td>
                                </tr>
                            )}
                            {comsets && comsets.map((eq, index) => (
                                <tr key={eq.id}>
                                    <td>{index+pager.from}</td>
                                    <td>{eq.description}</td>
                                    <td className="text-center">
                                        <Link to={`/comsets/${eq.id}/edit`} className="btn btn-sm btn-warning mr-1">
                                            <FaPencilAlt />
                                        </Link>
                                        <button className="btn btn-sm btn-danger">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {!loading && comsets.length <= 0 && (
                                <tr>
                                    <td colSpan={3} className="text-center">
                                        -- ไม่มีข้อมูล --
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ComsetList
