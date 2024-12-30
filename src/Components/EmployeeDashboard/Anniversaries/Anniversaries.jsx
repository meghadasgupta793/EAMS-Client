import React, { useState } from 'react';
import './Anniversaries.css';
import CakeIcon from '@mui/icons-material/Cake';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const ITEMS_PER_PAGE = 3;

const Anniversaries = () => {
  const [selectedOccasion, setSelectedOccasion] = useState('birthday');
  const [page, setPage] = useState(1);

  const employeeData = [
    { id: 1, img: '/images/profile.png', name: 'John Doe', date: '22 Oct', occasion: 'birthday' },
    { id: 2, img: '/images/profile.png', name: 'Jane Smith', date: '15 Sep', occasion: 'work anniversary' },
    { id: 3, img: '/images/profile.png', name: 'Sam Brown', date: '10 Aug', occasion: 'birthday' },
    { id: 4, img: '/images/profile.png', name: 'Alice Johnson', date: '5 Nov', occasion: 'work anniversary' },
    { id: 5, img: '/images/profile.png', name: 'Michael Lee', date: '30 Oct', occasion: 'birthday' },
    { id: 6, img: '/images/profile.png', name: 'Sara Connor', date: '19 Nov', occasion: 'work anniversary' },
    { id: 7, img: '/images/profile.png', name: 'Tom Wilson', date: '12 Jul', occasion: 'birthday' },
    { id: 8, img: '/images/profile.png', name: 'Emma Brown', date: '22 Jan', occasion: 'work anniversary' },
    { id: 9, img: '/images/profile.png', name: 'Alex Green', date: '5 Dec', occasion: 'birthday' },
    { id: 10, img: '/images/profile.png', name: 'Olivia Black', date: '14 Feb', occasion: 'work anniversary' },
  ];

  const filteredData = employeeData.filter((employee) => employee.occasion === selectedOccasion);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleToggleChange = (event, newOccasion) => {
    if (newOccasion !== null) {
      setSelectedOccasion(newOccasion);
      setPage(1); // Reset to first page when occasion changes
    }
  };

  const handleNext = () => {
    if (endIndex < filteredData.length) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="anniversaries-container">
      <div className='anniversari-header-container'>
        <h1 className='anniversari-heading'>Occasions</h1>
        <div className='anniversari-icon-container'>
          <ToggleButtonGroup
            value={selectedOccasion}
            exclusive
            onChange={handleToggleChange}
            aria-label="occasion filter"
            className="toggle-buttons"
          >
            <Tooltip title="Birthday" arrow>
              <ToggleButton value="birthday" aria-label="birthday">
                <CakeIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Work Anniversary" arrow>
              <ToggleButton value="work anniversary" aria-label="anniversary">
                <CelebrationIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </div>
      </div>

      <table className="anniversaries-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <img src={employee.img} alt={employee.name} className="employee-img" />
                </td>
                <td className="employee-name">{employee.name}</td>
                <td className="anniversary-date">{employee.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center' }}>No anniversaries or birthdays found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className='pagination-container'>
        {page > 1 && (
          <IconButton onClick={handlePrevious}>
            <KeyboardDoubleArrowLeftIcon className='pagination-btn' />
          </IconButton>
        )}
        <span>{page}</span>
        {endIndex < filteredData.length && (
          <IconButton onClick={handleNext}>
            <KeyboardDoubleArrowRightIcon className='pagination-btn' />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default Anniversaries;
