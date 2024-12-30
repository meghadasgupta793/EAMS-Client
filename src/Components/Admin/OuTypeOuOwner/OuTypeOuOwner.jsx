import React, { useState } from "react";
import './OuTypeOuOwner.css';
import Header from '../../Header/Header';
import { Tooltip, IconButton } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateOuType from "../Modals/CreateOuType/CreateOuType";
import CreateOuOwner from "../Modals/CreateOuOwner/CreateOuOwner";
import UpdateOuType from "../Modals/UpdateOuType/UpdateOuType"; // Importing UpdateOuType
import UpdateOuOwner from "../Modals/UpdateOuOwner/UpdateOuOwner"; // Importing UpdateOuOwner

const OuTypeOuOwner = () => {
    const [ouTypes, setOuTypes] = useState([
        { id: 1, type: "Head Office", createdDate: "01-01-2024" },
        { id: 2, type: "Branch", createdDate: "02-02-2024" },
    ]);

    const [ouOwners, setOuOwners] = useState([
        { id: 1, name: "John Doe", mobile: "1234567890", email: "john@example.com", secondaryEmail: "john.doe@company.com" },
        { id: 2, name: "Jane Smith", mobile: "0987654321", email: "jane@example.com", secondaryEmail: "jane.smith@company.com" },
    ]);

    const [selectedOuType, setSelectedOuType] = useState(null); // Selected OuType for updating
    const [selectedOuOwner, setSelectedOuOwner] = useState(null); // Selected OuOwner for updating

    const [showOuTypeModal, setShowOuTypeModal] = useState(false);
    const closeOuTypeModal = () => setShowOuTypeModal(false);

    const [showOuOwnerModal, setShowOuOwnerModal] = useState(false);
    const closeOuOwnerModal = () => setShowOuOwnerModal(false);

    const [showUpdateOuTypeModal, setShowUpdateOuTypeModal] = useState(false);
    const closeUpdateOuTypeModal = () => setShowUpdateOuTypeModal(false);

    const [showUpdateOuOwnerModal, setShowUpdateOuOwnerModal] = useState(false);
    const closeUpdateOuOwnerModal = () => setShowUpdateOuOwnerModal(false);

    const handleEditOuType = (ouType) => {
        setSelectedOuType(ouType);
        setShowUpdateOuTypeModal(true);
    };

    const handleEditOuOwner = (ouOwner) => {
        setSelectedOuOwner(ouOwner);
        setShowUpdateOuOwnerModal(true);
    };

    return (
        <div className='OuTypeOuOwner'>
            <Header />
            <div className='OuTypeOuOwner-container'>
                <h1>OuType And OuOwner</h1>

                {/* Center Grid - Two side-by-side sections */}
                <div className='OuTypeOuOwner-grids'>
                    {/* Left side - OuType Table */}
                    <div className='ouType-table-container'>
                        <div className="header-container">
                            <h1 className='heading'>OuType List</h1>
                            <div className='icon-container'>
                                <Tooltip title="Create New OuType">
                                    <IconButton onClick={() => setShowOuTypeModal(true)}>
                                        <AccountBalanceIcon className='header-icon' />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>

                        <table className='ouType-table'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>OuType</th>
                                    <th>Created Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ouTypes.map((ouType) => (
                                    <tr key={ouType.id}>
                                        <td>{ouType.id}</td>
                                        <td>{ouType.type}</td>
                                        <td>{ouType.createdDate}</td>
                                        <td>
                                            <Tooltip title="Edit OuType" arrow>
                                                <IconButton className="edit-btn" style={{ padding: 4, marginRight: 5 }} onClick={() => handleEditOuType(ouType)}>
                                                    <BorderColorIcon fontSize="small" style={{ color: 'white' }} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete OuType" arrow>
                                                <IconButton className="remove-btn" style={{ padding: 4, marginRight: 5 }}>
                                                    <DeleteIcon fontSize="small" style={{ color: 'white' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {showOuTypeModal && (
                            <CreateOuType closeOuTypeModal={closeOuTypeModal} />
                        )}
                        {showUpdateOuTypeModal && selectedOuType && (
                            <UpdateOuType
                                SelectedOuType={selectedOuType}
                                closeUpdateOuTypeModal={closeUpdateOuTypeModal}
                            />
                        )}
                    </div>

                    {/* Right side - OuOwner Table */}
                    <div className='ouOwner-table-container'>
                        <div className="header-container">
                            <h1 className='heading'>OuOwner List</h1>
                            <Tooltip title="Create New OuOwner">
                                <IconButton onClick={() => setShowOuOwnerModal(true)}>
                                    <GroupAddIcon className='header-icon' />
                                </IconButton>
                            </Tooltip>
                        </div>

                        <table className='ouOwner-table'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Mobile No</th>
                                    <th>Email</th>
                                    <th>Secondary Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ouOwners.map((ouOwner) => (
                                    <tr key={ouOwner.id}>
                                        <td>{ouOwner.id}</td>
                                        <td>{ouOwner.name}</td>
                                        <td>{ouOwner.mobile}</td>
                                        <td>{ouOwner.email}</td>
                                        <td>{ouOwner.secondaryEmail}</td>
                                        <td>
                                            <Tooltip title="Edit OuOwner" arrow>
                                                <IconButton className="edit-btn" style={{ padding: 4, marginRight: 5 }}
                                                    onClick={() => handleEditOuOwner(ouOwner)}>
                                                    <BorderColorIcon fontSize="small" style={{ color: 'white' }} />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete OuOwner" arrow>
                                                <IconButton className="remove-btn" style={{ padding: 4, marginRight: 5 }}>
                                                    <DeleteIcon fontSize="small" style={{ color: 'white' }} />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {showOuOwnerModal && (
                            <CreateOuOwner closeOuOwnerModal={closeOuOwnerModal} />
                        )}
                        {showUpdateOuOwnerModal && selectedOuOwner && (
                            <UpdateOuOwner
                                ouOwner={selectedOuOwner} // Pass selected ouOwner to the modal
                                closeUpdateOuOwnerModal={closeUpdateOuOwnerModal}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OuTypeOuOwner;
