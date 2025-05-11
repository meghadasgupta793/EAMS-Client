import React, { useState, useEffect, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import './UpComingHoliday.css';
import { UserContext } from '../../../StoreContext/UserContext';
import { useGetEmployeeUpcomingHolidaysMutation } from '../../../Redux/api/ess/essDashBoardAPI';

const ITEMS_PER_PAGE = 4;

const UpComingHoliday = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const { userInfo } = useContext(UserContext);
    const [getHolidays, { data: apiResponse, isLoading, error }] = useGetEmployeeUpcomingHolidaysMutation();
    const [holidays, setHolidays] = useState([]);

    // Debug user info
    useEffect(() => {
        console.log('User Context Info:', userInfo);
        console.log('Employee ID:', userInfo?.EmployeeId);
    }, [userInfo]);

    // Fetch holidays when component mounts and when userInfo changes
    useEffect(() => {
        const fetchHolidays = async () => {
            if (userInfo?.EmployeeId) {
                try {
                    console.log('Attempting to fetch holidays for EmployeeID:', userInfo.EmployeeId);
                    const response = await getHolidays({ EmployeeID: userInfo.EmployeeId }).unwrap();
                    console.log('API Response Data:', response);
                    setHolidays(response.data || []);
                } catch (err) {
                    console.error('API Error:', err);
                    console.error('Error Details:', err.data);
                    setHolidays([]);
                }
            } else {
                console.log('No EmployeeID available yet');
            }
        };

        fetchHolidays();
    }, [userInfo?.EmployeeId]);

    // Debug holidays data
    useEffect(() => {
        console.log('Current Holidays Data:', holidays);
    }, [holidays]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

    const formattedData = holidays.map(holiday => ({
        holidayName: holiday.name,
        fromDate: holiday.startDate,
        toDate: holiday.endDate
    }));

    const filteredData = formattedData.filter(item =>
        item.holidayName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

    const handleNext = () => {
        if (endIndex < filteredData.length) {
            setPage(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage(prev => prev - 1);
        }
    };

    if (isLoading) return <div className="loading">Loading holidays...</div>;
    if (error) return <div className="error">Error loading holidays</div>;

    return (
        <div className='upcomingHoliday-table-container'>
            <div className='upcomingHoliday-header-container'>
                <h1 className='upcomingHoliday-heading'>Upcoming etai Holidays</h1>
                <div className="search-container">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search holidays..."
                        className="search-input"
                    />
                </div>
            </div>
            
            <table className='upcomingHoliday-table'>
                <thead>
                    <tr>
                        <th>Holiday Name</th>
                        <th>From Date</th>
                        <th>To Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="no-holidays">
                                {searchQuery ? "No holidays match your search" : "No upcoming holidays found"}
                            </td>
                        </tr>
                    ) : (
                        paginatedData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.holidayName}</td>
                                <td>{item.fromDate}</td>
                                <td>{item.toDate}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {filteredData.length > ITEMS_PER_PAGE && (
                <div className='pagination-container'>
                    <Tooltip title="Previous Page">
                        <IconButton 
                            onClick={handlePrevious} 
                            disabled={page === 1}
                        >
                            <KeyboardDoubleArrowLeftIcon className='pagination-btn' />
                        </IconButton>
                    </Tooltip>
                    
                    <span className="page-indicator">Page {page} of {totalPages}</span>
                    
                    <Tooltip title="Next Page">
                        <IconButton 
                            onClick={handleNext} 
                            disabled={page === totalPages}
                        >
                            <KeyboardDoubleArrowRightIcon className='pagination-btn' />
                        </IconButton>
                    </Tooltip>
                </div>
            )}
        </div>
    );
};

export default UpComingHoliday;