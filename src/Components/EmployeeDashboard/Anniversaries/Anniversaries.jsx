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
import { useGetOccasionsQuery } from '../../../Redux/api/ess/essDashBoardAPI';
import config from '../../../secrect';

const ITEMS_PER_PAGE = 3;

const Anniversaries = () => {
  const { ImgUrl } = config;
  const [selectedOccasion, setSelectedOccasion] = useState('birthday');
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetOccasionsQuery();

  const employeeData = data?.data || [];

  const filteredData = employeeData.filter(
    (employee) => employee.occasion === selectedOccasion
  );

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

      {isLoading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : error ? (
        <p style={{ textAlign: 'center', color: 'red' }}>Failed to load data</p>
      ) : (
        <>
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
                      <img
                       src={`${ImgUrl}/${employee.img}`}
                       // src={employee.img?.startsWith('/') ? `${ImgUrl}/${employee.img}` : `/uploads/${employee.img}`}
                        alt={employee.name}
                        className="employee-img"
                      />
                    </td>
                    <td className="employee-name">{employee.name}</td>
                    <td className="anniversary-date">{employee.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center' }}>No {selectedOccasion}s found</td>
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
        </>
      )}
    </div>
  );
};

export default Anniversaries;
