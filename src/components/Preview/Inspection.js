import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { getInspection } from '../../features/slices/inspection/inspectionSlice'
import { toLongTHDate, currency } from '../../utils'
import { ThaiNumberToText } from '../../utils/currencyText'
import './Preview.css'

const Inspection = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { inspection } = useSelector(state => state.inspection);

    useEffect(() => {
        if (id) dispatch(getInspection(id));
    }, [dispatch, id]);

    return (
        <>
            {/* PAGE 1 */}
            <div className="paper-container">
                <div className="memo-wrapper">
                    <div className="memo-box">
                        <div className="memo-header text-center">
                            <h1 className="text-2xl font-bold mb-4">ใบตรวจรับการจัดซื้อ/จัดจ้าง</h1>
                        </div>
                        {inspection && (
                            <div className="memo-content">
                                <div className="flex">
                                    <p className="w-[50%]"></p>
                                    <p className="mb-2">วันที่ {toLongTHDate(moment(inspection?.inspect_date).toDate())}</p>
                                </div>
                                <div className="memo-paragraph leading-6">
                                    <span className="with-compressed-4x">
                                        ตาม ประกาศผู้ชนะการเสนอราคา ลงวันที่ {toLongTHDate(moment(inspection?.inspect_date).toDate())}&nbsp;
                                        ศูนย์สุขภาพจิตที่ ๙ กรมสุขภาพจิต
                                    </span>
                                    ได้ตกลง{inspection?.order?.requisition?.order_type_id === 1 ? 'ซื้อ' : 'จ้าง'}
                                    กับ {inspection?.supplier?.name}&nbsp;
                                    สำหรับการ{inspection?.order?.requisition?.order_type_id === 1 ? 'ซื้อ' : ''}{inspection?.order?.requisition?.category?.name}&nbsp;
                                    จำนวน {inspection?.item_count} รายการ โดยวิธีเฉพาะเจาะจง&nbsp;
                                    เป็นจำนวนเงินทั้งสิ้น {currency.format(inspection?.total)} บาท ({ThaiNumberToText(inspection?.total)})
                                </div>
                                <div className="memo-paragraph">
                                    ผู้ตรวจรับพัสดุ ได้ตรวจรับงานแล้ว ผลปรากฏว่า

                                    <div className="my-2 leading-6">
                                        <h4>1. ผลการตรวจรับ</h4>
                                        <div className="indent-[2cm]">
                                            <i className="far fa-square"></i> ถูกต้อง
                                            <p className="indent-[2.5cm]"><i className="far fa-square"></i> ครบถ้วนตามสัญญา</p>
                                            <p className="indent-[2.5cm]"><i className="far fa-square"></i> ไม่ครบถ้วนตามสัญญา</p>
                                        </div>
                                    </div>
                                    <div className="mb-2 leading-6">
                                        <h4>2. ค่าปรับ</h4>
                                        <div className="indent-[2cm]">
                                            <p><i className="far fa-square"></i> มีค่าปรับ</p>
                                            <p><i className="far fa-square"></i> ไม่มีค่าปรับ</p>
                                        </div>
                                    </div>
                                    <div className="mb-2 leading-6">
                                        <h4>3. การเบิกจ่ายเงิน</h4>
                                        <div className="indent-[4cm]">
                                            <p>เบิกจ่ายเงิน เป็นจำนวนเงินทั้งสิ้น {currency.format(inspection?.total)} บาท ({ThaiNumberToText(inspection?.total)})</p>
                                        </div>
                                    </div>
                                </div>

                                {/* ###################### signature ###################### */}
                                <div className="flex mt-[40px]">
                                    <div className="w-[50%]">&nbsp;</div>
                                    <div className="w-[50%] flex justify-center gap-2">
                                        <div className="mt-[20px] text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="w-[200px] border-dashed border-b"></p>
                                                <div className="signature leading-6">
                                                    <p>({inspection?.order?.requisition?.requester?.prefix?.name+inspection?.order?.requisition?.requester?.firstname+ ' ' +inspection?.order?.requisition?.requester?.lastname})</p>
                                                    <p>{inspection?.order?.requisition?.requester?.position?.name}{inspection?.order?.requisition?.requester?.level?.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5px text-left leading-6">
                                            ผู้ตรวจรับพัสดุ
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* END PAGE 1 */}
        </>
    )
}

export default Inspection