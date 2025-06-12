
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const BloodTypeChart = () => {
  const data = [
    { name: 'O+', value: 387, color: '#ef4444' },
    { name: 'A+', value: 324, color: '#f97316' },
    { name: 'B+', value: 256, color: '#eab308' },
    { name: 'AB+', value: 143, color: '#22c55e' },
    { name: 'O-', value: 89, color: '#3b82f6' },
    { name: 'A-', value: 67, color: '#8b5cf6' },
    { name: 'B-', value: 45, color: '#ec4899' },
    { name: 'AB-', value: 23, color: '#06b6d4' },
  ];

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Phân bố nhóm máu trong kho</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BloodTypeChart;
