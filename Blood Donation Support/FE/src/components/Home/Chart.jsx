// src/components/Home/Chart.jsx
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "T1", donors: 400 },
  { name: "T2", donors: 500 },
  { name: "T3", donors: 600 },
  { name: "T4", donors: 800 },
  { name: "T5", donors: 700 },
  { name: "T6", donors: 900 },
];

const Chart = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center text-red-600">Thống kê người hiến máu</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="donors" stroke="#ef4444" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
