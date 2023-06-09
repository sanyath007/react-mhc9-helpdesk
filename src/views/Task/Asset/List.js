import React from 'react'
import { FaTrash } from 'react-icons/fa'

const TaskAssetList = ({ assets, onRemove }) => {
    return (
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="w-[5%] text-center">#</th>
                        <th className="w-[20%] text-center">หมายเลขพัสดุ</th>
                        <th>รายการ</th>
                        <th className="w-[10%] text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assets && assets.map((asset, index) => (
                        <tr key={asset.id}>
                            <td className="text-center">{index+1}</td>
                            <td className="text-center">{asset.asset_no}</td>
                            <td>{asset.name}</td>
                            <td className="text-center">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => onRemove(asset.id)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TaskAssetList
