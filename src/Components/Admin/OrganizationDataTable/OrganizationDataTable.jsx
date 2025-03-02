import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './organizationDataTable.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { exportToExcel } from '../../Utils/excelUtils';
import { useNavigate } from 'react-router-dom';
import { useGetAllOuQuery, useDeleteOuMutation } from "../../../Redux/api/admin/ouApi";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ITEMS_PER_PAGE = 7;

const OrganizationDataTable = () => {
    const { data, error, isLoading } = useGetAllOuQuery();
    const [deleteOu, { isLoading: isDeleting }] = useDeleteOuMutation();
    const [searchActive, setSearchActive] = useState(false);
    const [searchQueries, setSearchQueries] = useState({
        ouCode: '',
        ouName: '',
        parentOu: '',
        ouType: '',
    });
    const [page, setPage] = useState(1);
    const OU = data?.data || [];

    const filteredData = OU.filter(item =>
        item.OUCode.toLowerCase().includes(searchQueries.ouCode.toLowerCase()) &&
        item.OUName.toLowerCase().includes(searchQueries.ouName.toLowerCase()) &&
        (item.ParentOU ? item.ParentOU.toString().toLowerCase().includes(searchQueries.parentOu.toLowerCase()) : true) &&
        item.OUTypeName.toLowerCase().includes(searchQueries.ouType.toLowerCase())
    );

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const handleSearchChange = (e, field) => {
        setSearchQueries(prevQueries => ({
            ...prevQueries,
            [field]: e.target.value
        }));
    };

    const handleNext = () => setPage(prev => prev + 1);
    const handlePrevious = () => setPage(prev => prev - 1);

    const handleExport = () => {
        exportToExcel(filteredData, 'OrganizationsDetails');
        toast.success('Data exported successfully!');
    };

    const navigate = useNavigate();
    const goToCreateOU = () => navigate('/newOU');
    const handleUpdate = (id) => navigate(`/updateOU/${id}`);
    const goToOuTypeandOuOwner = () => navigate('/OuOwnerandOuOwner');

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this OU?')) {
            try {
                await deleteOu(id).unwrap();
                toast.success('OU deleted successfully!');
            } catch (error) {
                const errorMessage = error.data?.error || 'Failed to delete OU.';
                toast.error(errorMessage); // Display the detailed error message
            }
        }
    };

    return (
        <div className="table-container">
            <div className="header-container">
                <h1 className="heading">Organization List</h1>
                <div className="icon-container">
                    <Tooltip title="Search">
                        <IconButton onClick={() => setSearchActive(!searchActive)}>
                            <SearchIcon className="header-icon" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Export OU Details in Excel">
                        <IconButton onClick={handleExport}>
                            <FileDownloadIcon className="header-icon" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Download Excel Template">
                        <IconButton>
                            <CloudDownloadIcon className="header-icon" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Choose File">
                        <IconButton>
                            <CloudUploadIcon className="header-icon" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="OU Type & OU Owner">
                        <IconButton onClick={goToOuTypeandOuOwner}>
                            <GroupAddIcon className="header-icon" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Create New OU">
                        <IconButton onClick={goToCreateOU}>
                            <AddBusinessIcon className="header-icon" />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>

            {error ? (
                <div>Error fetching data</div>
            ) : (
                <>
                    <table className="ou-table">
                        <thead>
                            <tr>
                                {searchActive ? (
                                    <>
                                        <th>
                                            <input
                                                type="text"
                                                value={searchQueries.ouCode}
                                                onChange={(e) => handleSearchChange(e, 'ouCode')}
                                                placeholder="Search OU Code"
                                            />
                                        </th>
                                        <th>
                                            <input
                                                type="text"
                                                value={searchQueries.ouName}
                                                onChange={(e) => handleSearchChange(e, 'ouName')}
                                                placeholder="Search OU Name"
                                            />
                                        </th>
                                        <th>
                                            <input
                                                type="text"
                                                value={searchQueries.parentOu}
                                                onChange={(e) => handleSearchChange(e, 'parentOu')}
                                                placeholder="Search Parent OU"
                                            />
                                        </th>
                                        <th>
                                            <input
                                                type="text"
                                                value={searchQueries.ouType}
                                                onChange={(e) => handleSearchChange(e, 'ouType')}
                                                placeholder="Search OU Type"
                                            />
                                        </th>
                                        <th>
                                            <input
                                                type="text"
                                                value={searchQueries.ownerName}
                                                onChange={(e) => handleSearchChange(e, 'ownerName')}
                                                placeholder="Search Owner Name"
                                            />
                                        </th>
                                        <th>Action</th>
                                    </>
                                ) : (
                                    <>
                                        <th>OU Code</th>
                                        <th>OU Name</th>
                                        <th>Parent OU</th>
                                        <th>OU Type</th>
                                        <th>Owner Name</th>
                                        <th>Action</th>
                                    </>
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                        <CircularProgress size={40} />
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map((item, index) => {
                                    const parentOU = OU.find((ou) => ou.ID === item.ParentOU)?.OUName || 'N/A';

                                    return (
                                        <tr key={index}>
                                            <td>{item.OUCode}</td>
                                            <td>{item.OUName}</td>
                                            <td>{parentOU}</td>
                                            <td>{item.OUTypeName}</td>
                                            <td>{item.OwnerName || 'N/A'}</td>
                                            <td>
                                                <BorderColorIcon className="action-btn update-btn" onClick={() => handleUpdate(item.ID)} />
                                                <DeleteForeverIcon className="action-btn delete-btn" onClick={() => handleDelete(item.ID)} disabled={isDeleting} />
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>

                    <div className="pagination-container">
                        {page > 1 && (
                            <IconButton onClick={handlePrevious}>
                                <KeyboardDoubleArrowLeftIcon className="pagination-btn" />
                            </IconButton>
                        )}
                        <span>{page}</span>
                        {endIndex < filteredData.length && (
                            <IconButton onClick={handleNext}>
                                <KeyboardDoubleArrowRightIcon className="pagination-btn" />
                            </IconButton>
                        )}
                    </div>
                </>
            )}

        </div>
    );
};

export default OrganizationDataTable;