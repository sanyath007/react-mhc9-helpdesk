import React, { useEffect, useState } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import api from '../../api'

const EquipmentList = () => {
    const [equipments, setEquipments] = useState(null);

    const fetchEquipments = async () => {
        try {
            const res = await api.get('/api/equipments');
            
            setEquipments(res.data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchEquipments();

        return () => fetchEquipments();
    }, []);

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item href="/">ข้อมูลพื้ฐาน</Breadcrumb.Item>
                <Breadcrumb.Item active>อุปกรณ์</Breadcrumb.Item>
            </Breadcrumb>
        
            <div className="content">
                <h2 className="text-xl">อุปกรณ์</h2>

                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>รายละเอียด</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipments && equipments.map((eq, index) => (
                                <tr>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EquipmentList
