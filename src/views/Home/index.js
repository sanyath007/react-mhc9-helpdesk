import React from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import { Breadcrumb } from 'react-bootstrap'
import { useGetUserDetailsQuery } from '../../services/auth/authApi'

const Home = () => {
    const { data } = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 900000,
    });

    return (
        <div className="content-wrapper">
            {/* breadcrumb */}
            <Breadcrumb>
                <Breadcrumb.Item href="/">หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
            </Breadcrumb>

            <div className="flex items-center gap-3 border border-green-900 bg-green-300 rounded-md p-4 text-green-800">
                <FaInfoCircle size={'50px'} />
                <div className="flex flex-col">
                    <h1 className="font-bold text-2xl">Welcome to IT Helpdesk System</h1>
                    <p className="">
                        {data && data.name}
                    </p>
                </div>
            </div>

            {/* content */}
            <div className="content mt-3 border min-h-[70vh]">
                <h2 className="text-xl">สถิติการแจ้งซ่อม</h2>
            </div>
        </div>
    )
}

export default Home