import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { getRequisition } from '../../features/slices/requisition/requisitionSlice'
import { toLongTHDate, currency } from '../../utils'
import { ThaiNumberToText } from '../../utils/currencyText'
import './Preview.css'

const RequisitionReport = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { requisition } = useSelector(state => state.requisition);

    useEffect(() => {
        if (id) dispatch(getRequisition({ id }));
    }, [dispatch, id]);

    return (
        <>
            {/* PAGE 1 */}
            <div className="paper-container">
                <div className="memo-wrapper">
                    <div className="memo-top">
                        <div className="memo-logo">
                            <img src={`${process.env.REACT_APP_API_URL}/img/krut.jpg`} />
                        </div>
                        <h1>บันทึกข้อความ</h1>
                    </div>
                    {requisition && (
                        <div className="memo-box">
                            <div className="memo-header">
                                <div className="memo-header-text">
                                    <h3>ส่วนราชการ</h3>
                                    <div className="memo-header-value">
                                        <span>{requisition.division?.department?.name} ศูนย์สุขภาพจิตที่ ๙ โทร o ๔๔๒๕ ๖๗๒๙</span>
                                        {/* requisition.division?.name+ ' '+ */}
                                    </div>
                                </div>
                                <div className="memo-header-text">
                                    <div>
                                        <h3>ที่</h3>
                                        <div className="memo-header-value">
                                            <span>{requisition.pr_no}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3>วันที่</h3>
                                        <div className="memo-header-value">
                                            <span>{toLongTHDate(moment(requisition.pr_date).toDate())}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="memo-header-text">
                                    <h3>เรื่อง</h3>
                                    <div className="memo-header-value">
                                        <span>รายงานขอ{((requisition.order_type_id == 1) ? 'ซื้อ' : '') +requisition.category?.name} จำนวน {requisition.item_count} รายการ โดย{'...'}</span>
                                    </div>
                                </div>
                                <div className="memo-header-text">
                                    <h3>เรียน</h3>
                                    <span>อธิบดีกรมสุขภาพจิต (ผ่านหัวหน้าเจ้าหน้าที่)</span>
                                </div>
                            </div>
                            <div className="memo-content">
                                <div className="memo-paragraph">
                                    ด้วย ศูนย์สุขภาพจิตที่ ๙ กรมสุขภาพจิต มีความประสงค์จะ{((requisition.order_type_id == 1) ? 'ซื้อ' : '') +requisition.category?.name}&nbsp;
                                    จำนวน {requisition.item_count} รายการ โดย... ซึ่งมีรายละเอียด ดังต่อไปนี้
                                </div>
                                <div className="memo-paragraph">
                                    1. เหตุผลและความจำเป็นที่ต้องจัดซื้อจัดจ้าง
                                    <div className="indent-0">
                                        <p className="indent-[3.5cm]">
                                            {requisition.reason ? requisition.reason : `เพื่อใช้ในการดำเนินงานภายในศูนย์สุขภาพจิตที่ 9 ปีงบประมาณ ${requisition.year}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="memo-paragraph">
                                    2. รายละเอียดของพัสดุ
                                    <div className="indent-0">
                                        <p className="indent-[3.5cm]">{((requisition.order_type_id == 1) ? 'ซื้อ' : '') +requisition.category?.name} จำนวน {requisition.item_count} รายการ (รายละเอียดตามเอกสารแนบ)</p>
                                    </div>
                                </div>
                                <div className="memo-paragraph">
                                    3. ราคากลางของพัสดุที่จะซื้อหรือจ้าง
                                    <div className="indent-0">
                                        <p className="indent-[3.5cm]">ราคาที่ได้มาจากการสืบราคาจากท้องตลาด {currency.format(requisition.net_total)} บาท ({ThaiNumberToText(requisition.net_total)})</p>
                                    </div>
                                </div>
                                <div className="memo-paragraph">
                                    4. วงเงินที่จะซื้อ
                                    <div className="indent-0">
                                        <p className="indent-[3.5cm]">เงินงบประมาณรายจ่ายประจำปี พ.ศ. {requisition.year} จำนวนเงิน {currency.format(requisition.net_total)} บาท ({ThaiNumberToText(requisition.net_total)})</p>
                                    </div>
                                </div>
                                <div className="memo-paragraph">
                                    5. กำหนดเวลาที่ต้องการใช้พัสดุนั้น หรือให้งานนั้นแล้วเสร็จ
                                    <div className="indent-0">
                                        <p className="indent-[3.5cm]"> กำหนดเวลาการส่งมอบพัสดุ หรือให้งานแล้วเสร็จภายในวันที่ ...</p>
                                    </div>
                                </div>
                                <div className="memo-paragraph">
                                    6. วิธีที่จะซื้อ และเหตุผลที่ต้องซื้อ
                                    <div className="indent-0">
                                        <p className="indent-[3.5cm]">
                                            ดำเนินการโดย... ตามพระราชบัญญัติการจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ. ๒๕๖๐ มาตรา ๕๕(๓) และมาตรา ๕๖(๒) (ข)&nbsp;
                                            ประกอบกับระเบียบกระทรวงการคลังว่าด้วยการจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ. ๒๕๖๐ และกฎกระทรวง กำหนดวงเงินการจัดซื้อจัดจ้างพัสดุโดย...&nbsp;
                                            วงเงินการจัดซื้อจัดจ้างที่ไม่ทำข้อตกลงเป็นหนังสือ และวงเงินการจัดซื้อจัดจ้างในการแต่งตั้งผู้ตรวจรับพัสดุ พ.ศ. ๒๕๖๐ ข้อ ๑&nbsp;
                                            การจัดซื้อจัดจ้างพัสดุที่มีการผลิต จำหน่าย ก่อสร้าง หรือให้บริการทั่วไป และมีวงเงินในการจัดซื้อจัดจ้างครั้งหนึ่งไม่เกิน ๕๐๐,๐๐๐ บาท (ห้าแสนบาทถ้วน)
                                        </p>
                                    </div>
                                </div>
                                <div className="memo-paragraph">
                                    7. หลักเกณฑ์การพิจารณาคัดเลือกข้อเสนอ
                                    <div className="indent-0">
                                        <p className="indent-[3.5cm]">การพิจารณาคัดเลือกข้อเสนอโดยใช้เกณฑ์ราคา</p>
                                    </div>
                                </div>
                                {/* END PAGE 1 */}

                                <div style={{ pageBreakBefore: 'always' }}></div>

                                {/* PAGE 2 */}
                                <div className="memo-paragraph mt-[2.5cm]">
                                    8. การขออนุมัติแต่งตั้งคณะกรรมการต่าง ๆ
                                    <div className="indent-0">
                                        <p className="indent-[3.5cm]">ผู้จัดทำร่างขอบเขตของานหรือรายละเอียดคุณลักษณะเฉพาะและราคากลาง</p>
                                        <div className="indent-[4cm]">
                                            {requisition.committees.map((com, index) => (
                                                <p key={com.id}>
                                                    {requisition.committees.length > 1 && <span>{index+1}. </span>}
                                                    {com.employee.prefix.name+com.employee.firstname+ ' ' +com.employee.lastname}
                                                    {' '}ตำแหน่ง {com.employee.position?.name}{com.employee.level?.name}
                                                </p>
                                            ))}
                                        </div>
                                        <p className="indent-[3.5cm]">ผู้ตรวจรับพัสดุ</p>
                                        <div className="indent-[4cm]">
                                            {requisition.committees.map((com, index) => (
                                                <p key={com.id}>
                                                    {requisition.committees.length > 1 && <span>{index+1}. </span>}
                                                    {com.employee.prefix.name+com.employee.firstname+ ' ' +com.employee.lastname}
                                                    {' '}ตำแหน่ง {com.employee.position?.name}{com.employee.level?.name}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="memo-paragraph">
                                    จึงเรียนมาเพื่อโปรดพิจารณา หากเห็นชอบขอได้โปรด
                                    <div className="indent-0">
                                        <p className="indent-[3.5cm]">1. อนุมัติให้ดำเนินการ ตามรายละเอียดในรายงานขอซื้อดังกล่าวข้างต้น</p>
                                        <p className="indent-[3.5cm]">2. ลงนามในคำสั่งแต่งตั้งผู้ตรวจรับพัสดุ</p>
                                    </div>
                                </div>

                                <div className="memo-approvement">
                                    <div className="memo-row">
                                        <div style={{ width: '40%' }}>&nbsp;</div>
                                        <div style={{ width: '60%' }}>
                                            <div style={{ textAlign: 'center', width: '100%' }}>
                                                <div className="pt-[40px] flex flex-col items-center justify-center">
                                                    <p className="w-[200px] border-dashed border-b mb-1"></p>
                                                    <div className="signature">
                                                        {/* <p>({requisition.requester.prefix.name+requisition.requester.firstname+ ' ' +requisition.requester.lastname})</p> */}
                                                        <p>(นางสาวทิพปภา สีมาธรรมการย์)</p>
                                                        <p>นักวิชาการพัสดุ</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="memo-row">
                                        <div style={{ width: '40%' }}>
                                            <div style={{ width: '100%', height: '100px' }}>
                                                <div>
                                                    <p>เรียน อธิบดีกรมสุขภาพจิต</p>
                                                    <p style={{ textIndent: '1cm' }}>- เพื่อโปรดพิจารณาอนุมัติ</p>
                                                </div>
                                                <div className="pt-[40px] flex flex-col items-center justify-center">
                                                    <p className="w-[200px] border-dashed border-b mb-1"></p>
                                                    <div className="signature">
                                                        {/* <p>({requisition.requester.prefix.name+requisition.requester.firstname+ ' ' +requisition.requester.lastname})</p> */}
                                                        <p>(นางณัฏฐา ศิริผล)</p>
                                                        <p>หัวหน้าเจ้าหน้าที่</p>
                                                        <div className="signature-date">
                                                            <p>วันที่</p>
                                                            <div style={{ width: '150px', borderBottom: '1px dashed black' }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ width: '60%' }}>
                                            <div style={{ textAlign: 'center', width: '100%', height: '120px' }}>
                                                <div style={{ marginTop: '60px' }}>
                                                    เห็นชอบ/อนุมัติ
                                                </div>
                                                <div className="pt-[40px] flex flex-col items-center justify-center">
                                                    <p className="w-[200px] border-dashed border-b mb-1"></p>
                                                    <div className="signature">
                                                        <p>( นายนิตย์  ทองเพชรศรี )</p>
                                                        <p>ผู้อำนวยการศูนย์สุขภาพจิตที่ 9</p>
                                                        <p>ปฏิบัติราชการแทนอธิบดีกรมสุขภาพจิต</p>
                                                        <div className="signature-date">
                                                            <p>วันที่</p>
                                                            <div style={{ width: '150px', borderBottom: '1px dashed black' }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* END PAGE 2 */}
        </>
    )
}

export default RequisitionReport