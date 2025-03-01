import React, { useState } from 'react';
import './UnAssignDeviceList.css';
import Header from '../../../../Components/Header/Header';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ITEMS_PER_PAGE = 5;

const UnAssignDeviceList = () => {
    const [page, setPage] = useState(1);

    const data = [
        { cpuid: '6716016080000003', subtype: 'f456', firmware: '8.912.388', ipaddress: '192.168.000.105', lastsyncdatetime: '2024-06-10T07:17:28.087Z' },
        { cpuid: '6716016080000004', subtype: 'f789', firmware: '8.914.200', ipaddress: '192.168.000.106', lastsyncdatetime: '2024-06-11T08:25:18.087Z' },
        { cpuid: '6716016080000005', subtype: 'f123', firmware: '8.915.001', ipaddress: '192.168.000.107', lastsyncdatetime: '2024-06-12T09:45:38.087Z' },
        { cpuid: '6716016080000006', subtype: 'f654', firmware: '8.916.150', ipaddress: '192.168.000.108', lastsyncdatetime: '2024-06-13T11:32:48.087Z' },
        { cpuid: '6716016080000007', subtype: 'f321', firmware: '8.917.920', ipaddress: '192.168.000.109', lastsyncdatetime: '2024-06-14T14:22:58.087Z' },
        { cpuid: '6716016080000008', subtype: 'f987', firmware: '8.918.450', ipaddress: '192.168.000.110', lastsyncdatetime: '2024-06-15T16:12:18.087Z' },
        { cpuid: '6716016080000009', subtype: 'f654', firmware: '8.919.870', ipaddress: '192.168.000.111', lastsyncdatetime: '2024-06-16T17:45:28.087Z' },
        { cpuid: '6716016080000010', subtype: 'f333', firmware: '8.920.340', ipaddress: '192.168.000.112', lastsyncdatetime: '2024-06-17T19:20:38.087Z' },
        { cpuid: '6716016080000011', subtype: 'f555', firmware: '8.921.120', ipaddress: '192.168.000.113', lastsyncdatetime: '2024-06-18T20:55:48.087Z' },
        { cpuid: '6716016080000012', subtype: 'f777', firmware: '8.922.800', ipaddress: '192.168.000.114', lastsyncdatetime: '2024-06-19T21:30:58.087Z' },
    ];
    

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = data.slice(startIndex, endIndex);

    const handleNext = () => {
        setPage(prev => prev + 1);
    };

    const handlePrevious = () => {
        setPage(prev => prev - 1);
    };

    return (
        <div className='unAssignDeviceList'>
           <Header />
           <div className='unAssignDeviceList-table-container'>
           <div className='unassign-header-container'>
                <h1 className='unassign-heading'>Unassigned Device List</h1>
            </div>

            <table className='unAssignDeviceList-table'>
                <thead>
                    <tr>
                        <th>CPU ID</th>
                        <th>Subtype</th>
                        <th>Firmware</th>
                        <th>IP Address</th>
                        <th>Last Sync DateTime</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.cpuid}</td>
                            <td>{item.subtype}</td>
                            <td>{item.firmware}</td>
                            <td>{item.ipaddress}</td>
                            <td>{new Date(item.lastsyncdatetime).toLocaleString()}</td>
                            <td>
                                <Tooltip title="Create">
                                    <IconButton>
                                        <AddCircleOutlineIcon className='action-btn create-btn' />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton>
                                        <DeleteForeverIcon className='action-btn delete-btn' />
                                    </IconButton>
                                </Tooltip>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='pagination-container'>
                {page > 1 && (
                    <IconButton onClick={handlePrevious}>
                        <span className='pagination-btn'>&lt;</span>
                    </IconButton>
                )}
                <span>{page}</span>
                {endIndex < data.length && (
                    <IconButton onClick={handleNext}>
                        <span className='pagination-btn'>&gt;</span>
                    </IconButton>
                )}
            </div>
           </div>
        </div>
    );
};

export default UnAssignDeviceList;
