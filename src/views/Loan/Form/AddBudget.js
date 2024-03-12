import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { FormGroup } from 'react-bootstrap'
import { FaSearch, FaPlus, FaTimes } from 'react-icons/fa'
import ModalBudgetList from '../../../components/Modals/BudgetList'

const AddBudget = ({ data, formData, onAddBudget }) => {
    const [budget, setBudget] = useState(null);
    const [showBudgetModal, setShowBudgetModal] = useState(false);

    const handleSubmit = (values, formik) => {
        if (data) {
            // onUpdateItem(values.item_id, { ...values, item })
        } else {
            const budget = formData.find(bud => bud.id === parseInt(values.budget_id, 10));

            onAddBudget({ ...values, budget: budget });
        }

        formik.resetForm();
    };

    return (
        <Formik
            initialValues={{
                budget_id: '',
                total: ''
            }}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <>
                        <ModalBudgetList
                            isShow={showBudgetModal}
                            onHide={() => setShowBudgetModal(false)}
                            onSelect={(budget) => {
                                setBudget(budget);
                                formik.setFieldValue('budget_id', budget.id);
                            }}
                        />

                        <div className="flex flex-row gap-2 mb-2">
                            <FormGroup className="w-[75%]">
                                <div className="input-group">
                                    <div className="form-control min-h-[34px] bg-gray-100">
                                        {budget && (
                                            <>
                                                <p className="text-sm">{budget?.name}</p>
                                                {/* <p className="font-thin text-xs">{budget?.project?.plan?.name}/{budget?.project?.name}</p> */}
                                            </>
                                        )}
                                    </div>
                                    <input
                                        type="hidden"
                                        name="budget_id"
                                        value={formik.values.budget_id}
                                        onChange={formik.handleChange}
                                        className="form-control text-sm"
                                    />
                                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowBudgetModal(true)}>
                                        <FaSearch />
                                    </button>
                                </div>
                                {(formik.errors.total && formik.touched.total) && (
                                    <span className="text-red-500 text-sm">{formik.errors.total}</span>
                                )}
                            </FormGroup>
                            <FormGroup className="w-[15%]">
                                <input
                                    type="text"
                                    name="total"
                                    value={formik.values.total}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm text-right"
                                    placeholder="จำนวนเงิน"
                                />
                                {(formik.errors.budget_id && formik.touched.budget_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.budget_id}</span>
                                )}
                            </FormGroup>
                            <FormGroup className="w-[10%]">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button
                                        type="button"
                                        className={`btn ${data ? 'btn-outline-warning' : 'btn-outline-primary'} text-sm min-[992px]:px-2 max-[992px]:px-1`}
                                        onClick={formik.submitForm}
                                    >
                                        {/* <FaPlus /> */}
                                        เพิ่ม
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger text-xs min-[1285px]:text-sm  max-[1285px]:px-1 min-[1285px]:px-2"
                                    >
                                        {/* <FaTimes /> */}
                                        {data ? 'ยกเลิก' : 'เคลียร์'}
                                    </button>
                                </div>
                            </FormGroup>
                        </div>
                    </>
                )
            }}
        </Formik>
    )
}

export default AddBudget