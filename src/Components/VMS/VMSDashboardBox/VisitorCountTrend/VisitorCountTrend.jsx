import React, { useState } from 'react';
import './VisitorCountTrend.css';
import { Tooltip } from '@mui/material';
////import VisitorCountTrendModal from '../../Modal/VisitorCountTrendModal/VisitorCountTrendModal';

const VisitorCountTrend = () => {
  const data = {
    Daily: { Monday: 50, Tuesday: 60, Wednesday: 45, Thursday: 80, Friday: 90, Saturday: 100, Sunday: 70 },
    Weekly: { Week1: 300, Week2: 350, Week3: 400, Week4: 450 },
    Monthly: { Jan: 1200, Feb: 1100, Mar: 1400, Apr: 1300 },
  };

  const [selectedPeriod, setSelectedPeriod] = useState('Daily');
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBarClick = (timePeriod, count) => {
    setModalData({ timePeriod, count });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const timePeriods = selectedPeriod === 'Daily' ? Object.keys(data.Daily) : selectedPeriod === 'Weekly' ? Object.keys(data.Weekly) : Object.keys(data.Monthly);
  const maxValue = Math.max(...timePeriods.map((time) => data[selectedPeriod][time]));

  return (
    <div className="visitor-count-trend">
      <h2>Visitor Count Trend</h2>
      <div className="visitor-count-trend__period-selector">
        <label htmlFor="periodSelect">Select Period:</label>
        <select id="periodSelect" value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>

      <div className="visitor-count-trend__chart">
        {timePeriods.map((period) => (
          <div key={period} className="visitor-count-trend__bar-wrapper">
            <Tooltip title={`${selectedPeriod}: ${data[selectedPeriod][period]}`} placement="top" arrow>
              <div
                className="visitor-count-trend__bar"
                style={{
                  height: `${(data[selectedPeriod][period] / maxValue) * 200}px`,
                }}
                onClick={() => handleBarClick(period, data[selectedPeriod][period])}
              ></div>
            </Tooltip>
            <div className="visitor-count-trend__label">{period}</div>
          </div>
        ))}
      </div>
{/*
      {isModalOpen && (
        <VisitorCountTrendModal data={modalData} onClose={handleModalClose} />
      )}*/}
    </div>
  );
};

export default VisitorCountTrend;
