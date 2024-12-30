import React from 'react';
import './adminDashboardPiechart.css';
import PropTypes from 'prop-types';
import { PieChart } from '@mui/x-charts/PieChart';

const AdminDashboardPiechart = ({ title, data, colors }) => {
  const defaultData = [
    { id: 1, value: 25, label: 'Option 1' },
    { id: 2, value: 25, label: 'Option 2' },
    { id: 3, value: 25, label: 'Option 3' },
    { id: 4, value: 25, label: 'Option 4' },
  ];

  const finalData = data.length >= 4 ? data : defaultData;
  const defaultColors = ['#1da99c', '#7dcf61', '#4abb83', '#8be0b9'];


  const appliedColors =  defaultColors;

  const coloredData = finalData.map((item, index) => ({
    ...item,
    color: appliedColors[index % appliedColors.length],
  }));

  return (
    <div className="pieChart">
      <div className="top">
        <h1 className="title">{title}</h1>
      </div>
      <div className="bottom">
        <div className="chart-container">
          {coloredData.length ? (
            <PieChart
              sx={{ position: 'relative', overflow: 'hidden' }}
              series={[
                {
                  data: coloredData,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  label: {
                    visible: false,  // This should hide the default labels
                  },
                },
              ]}
              height={160}
            />
          ) : (
            <p>No data available</p>
          )}
        </div>
        <div className="labels">
          {coloredData.map((item) => (
            <div key={item.id} className="label-item">
              <div
                className="color-box"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="label-text">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

AdminDashboardPiechart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default AdminDashboardPiechart;
