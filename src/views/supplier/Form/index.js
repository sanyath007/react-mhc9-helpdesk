import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Col, Row } from 'react-bootstrap'
import { useGetInitialFormDataQuery } from '../../../services/supplier/supplierApi'
import Loading from '../../../components/Loading'

const supplierSchema = Yup.object().shape({

});

const initialFormData = {
    changwats: [],
    amphurs: [],
    tambons: [],
};

const SupplierForm = () => {
    const [filteredAmphurs, setFilteredAmphurs] = useState([]);
    const [filteredTambons, setFilteredTambons] = useState([]);
    const { data: formData = initialFormData, isLoading } = useGetInitialFormDataQuery();

    const handleSubmit = (values, formik) => {

    };

    const handleChangwatSelect = (id) => {
        setFilteredAmphurs(formData.amphurs.filter(amp => amp.chw_id === id));
    };

    const handleAmphurSelect = (id) => {
        setFilteredTambons(formData.tambons.filter(tam => tam.amp_id === id));
    };

    return (
        <Formik
            initialValues={{
                tax_no: '',
                name: '',
                address: '',
                moo: '',
                road: '',
                tambon_id: '',
                amphur_id: '',
                changwat_id: '',
                zipcode: '',
                tel: '',
                fax: '',
                email: '',
                seller_name: '',
                seller_tel: '',
                seller_email: '',
                manager_name: '',
                owner_name: '',
                bank_acc_no: '',
                bank_acc_name: '',
                bank_acc_branch: '',
                tax_type_id: '',
                remark: '',
            }}
            validationSchema={supplierSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => (
                <Form>
                    <Row className="mb-2">
                        <Col>
                            <label>ชื่อผู้จัดจำหน่าย</label>
                            <input
                                type="text"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className="form-control font-thin text-sm"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <label>ที่อยู่เลขที่</label>
                            <input
                                type="text"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                className="form-control font-thin text-sm"
                            />
                        </Col>
                        <Col md={2}>
                            <label>หมู่</label>
                            <input
                                type="text"
                                value={formik.values.moo}
                                onChange={formik.handleChange}
                                className="form-control font-thin text-sm"
                            />
                        </Col>
                        <Col md={4}>
                            <label>ถนน</label>
                            <input
                                type="text"
                                value={formik.values.road}
                                onChange={formik.handleChange}
                                className="form-control font-thin text-sm"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={4}>
                            <label>จังหวัด</label>
                            {isLoading ? <div className="form-control text-sm"><Loading /></div> : (
                                <select
                                    type="text"
                                    name="changwat_id"
                                    values={formik.values.changwat_id}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        handleChangwatSelect(e.target.value);
                                    }}
                                    className="form-control font-thin text-sm"
                                >
                                    <option value="">-- เลือก --</option>\
                                    {formData.changwats.map(changwat => (
                                        <option value={changwat.id} key={changwat.id}>{changwat.name}</option>
                                    ))}
                                </select>
                            )}
                        </Col>
                        <Col md={4}>
                            <label>อำเภอ</label>
                            {isLoading ? <div className="form-control text-sm"><Loading /></div> : (
                                <select
                                    type="text"
                                    name="amphur_id"
                                    values={formik.values.amphur_id}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        handleAmphurSelect(e.target.value);
                                    }}
                                    className="form-control font-thin text-sm"
                                >
                                    <option value="">-- เลือก --</option>
                                    {filteredAmphurs.map(amphur => (
                                        <option value={amphur.id} key={amphur.id}>{amphur.name}</option>
                                    ))}
                                </select>
                            )}
                        </Col>
                        <Col md={4}>
                            <label>ตำบล</label>
                            {isLoading ? <div className="form-control text-sm"><Loading /></div> : (
                                <select
                                    type="text"
                                    name="tambon_id"
                                    values={formik.values.tambon_id}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    className="form-control font-thin text-sm"
                                >
                                    <option value="">-- เลือก --</option>
                                    {filteredTambons.map(tambon => (
                                        <option value={tambon.id} key={tambon.id}>{tambon.name}</option>
                                    ))}
                                </select>
                            )}
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={4}>
                            <label>รหัสไปรษณีย์</label>
                            <input
                                type="text"
                                value={formik.values.zipcode}
                                onChange={formik.handleChange}
                                className="form-control font-thin text-sm"
                            />
                        </Col>
                        <Col md={4}>
                            <label>โทรศัพท์</label>
                            <input
                                type="text"
                                value={formik.values.tel}
                                onChange={formik.handleChange}
                                className="form-control font-thin text-sm"
                            />
                        </Col>
                        <Col md={4}>
                            <label>โทรสาร</label>
                            <input
                                type="text"
                                value={formik.values.fax}
                                onChange={formik.handleChange}
                                className="form-control font-thin text-sm"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={4}>
                            <label>อีเมล</label>
                            <input
                                type="text"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className="form-control font-thin text-sm"
                            />
                        </Col>
                        <Col md={4}>
                            <label>เลขที่ผู้เสียภาษี</label>
                            <input
                                type="text"
                                value={formik.values.tax_no}
                                onChange={formik.handleChange}
                                className="form-control font-thin text-sm"
                            />
                        </Col>
                        <Col md={4}>
                            <label>ประเภทภาษี</label>
                            <select
                                type="text"
                                className="form-control font-thin text-sm"
                            >
                                <option value="">-- เลือก --</option>
                                <option value="1">ภาษีเงินได้บุคคลธรรมดา</option>
                            </select>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={6}>
                            <label>ชื่อเจ้าของ</label>
                            <input
                                type="text"
                                value={formik.values.owner_name}
                                onChange={formik.handleChange}
                                className="form-control font-thin text-sm"
                            />
                        </Col>
                        <Col md={6}>
                            <label>ชื่อผู้จัดการ</label>
                            <input
                                type="text"
                                value={formik.values.manager_name}
                                onChange={formik.handleChange}
                                className="form-control font-thin text-sm"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col>
                            <label>หมายเหตุ</label>
                            <textarea
                                rows="3"
                                value={formik.values.remark}
                                onChange={formik.handleChange}
                                className="form-control font-thin text-sm"
                            ></textarea>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <button type="submit" className="btn btn-outline-primary text-sm float-right">
                                บันทึก
                            </button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    )
}

export default SupplierForm