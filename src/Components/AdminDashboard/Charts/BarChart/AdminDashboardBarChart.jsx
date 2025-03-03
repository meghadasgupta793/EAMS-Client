import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';

// Dummy data
const data = [
  { date: '2024-08-01', present: 4, absent: 2, wo: 2, onLeave: 2 },
  { date: '2024-08-02', present: 10, absent: 8, wo: 8, onLeave: 8 },
  { date: '2024-08-03', present: 5, absent: 1, wo: 1, onLeave: 1 },
  { date: '2024-08-04', present: 4, absent: 3, wo: 3, onLeave: 3 },
  { date: '2024-08-05', present: 1, absent: 1, wo: 1, onLeave: 1 },
  { date: '2024-08-06', present: 5, absent: 6, wo: 8, onLeave: 9 },
  { date: '2024-08-07', present: 5, absent: 6, wo: 8, onLeave: 9 },

];

const barColors = ['#1da99c', '#7dcf61', '#4abb83', '#8be0b9'];
const barKeys = ["present", "absent", "wo", "onLeave"];
const AdminDashboardBarChart = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h3 style={{ textAlign: 'center', color: '#014872' }}>Weekly Attendance</h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(tick) => {
              if (!tick) return "";
              try {
                return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(tick));
              } catch (error) {
                return tick;
              }
            }}
          />
          <YAxis tickFormatter={(value) => value ?? 0} />
          <Tooltip />
          <Legend />
          {barKeys.map((key, index) => (
            <Bar key={key} dataKey={key} stackId="a" fill={barColors[index % barColors.length]} /> // Dynamically rendering bars
          ))}

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminDashboardBarChart;
