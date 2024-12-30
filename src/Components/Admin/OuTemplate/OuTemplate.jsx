import React from 'react';
import ExcelIcon from '@mui/icons-material/InsertDriveFile';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import './OuTemplate.css';

const OuTemplate = () => {
  return (
    <div className='ou-template'>
      <div className='first-row'>
        <a href='/path-to-your-template/template.xlsx' download>
          <button className='download-template-button'>
            <CloudDownloadIcon fontSize='small' className='download-icon' /> Download Excel Template to Import
          </button>
        </a>
        <div className='input-container'>
          <ExcelIcon fontSize='small' className='excel-icon' />
          <input type='file' accept='.xlsx, .xls' placeholder='Choose File' />
        </div>
      </div>

      <div className='second-row'>
        <button className='create-ou-button'>
          <AddCircleIcon fontSize='small' className='create-otype-icon' /> Create OuType
        </button>
        <button className='create-ou-button'>
          <AddCircleIcon fontSize='small' className='create-ouowner-icon' /> Create OuOwner
        </button>
        <button className='create-ou-button'>
          <AddCircleIcon fontSize='small' className='create-new-ou-icon' /> Create New OU
        </button>
      </div>
    </div>
  );
};

export default OuTemplate;
