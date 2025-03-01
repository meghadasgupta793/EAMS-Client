import React, { useState } from 'react';
import './DeviceHealthStatus.css';
import OnlineIcon from '@mui/icons-material/CheckCircle';
import OfflineIcon from '@mui/icons-material/Cancel';
import InactiveIcon from '@mui/icons-material/HourglassEmpty';

const DeviceHealthStatus = () => {
  const [statuses] = useState([
    { Icon: OnlineIcon, title: 'Online', value: 35 },
    { Icon: OfflineIcon, title: 'Offline', value: 10 },
    { Icon: InactiveIcon, title: 'Inactive', value: 5 },
  ]);

  return (
    <div className="DHS-box-container">
      <h1 className="DHS-box-title">Device Health Status</h1>
      <div className="DHS-box">
        {statuses.map(({ Icon, title, value }, index) => (
          <div
            className={`DHS-StatusItem ${
              index === statuses.length - 1 ? 'DHS-no-border' : ''
            }`}
            key={title}
          >
            <Icon className="DHS-StatusIcon" />
            <h2 className="DHS-StatusTitle">{title}</h2>
            <h2 className="DHS-StatusValue">{value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceHealthStatus;
