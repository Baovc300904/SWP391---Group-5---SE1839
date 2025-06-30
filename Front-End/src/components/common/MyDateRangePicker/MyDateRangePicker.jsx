import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import './MyDateRangePicker.css';

const { RangePicker } = DatePicker;

const MyDateRangePicker = ({ onChange }) => {
  const [dateRange, setDateRange] = useState(null);

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      const [startDate, endDate] = dates;
      const range = {
        startDate: startDate.toDate(),
        endDate: endDate.toDate(),
      };
      setDateRange(range);
      onChange?.(range);
    } else {
      setDateRange(null);
      onChange?.(null);
    }
  };

  return (
    <div className="date-picker-wrapper">
      <Space direction="vertical" size={12}>
        <RangePicker
          onChange={handleDateChange}
          format="DD/MM/YYYY"
          placeholder={['Từ ngày', 'Đến ngày']}
          style={{ width: '100%' }}
          size="large"
        />
        {dateRange && (
          <div className="selected-days">
            Đã chọn: {dateRange.startDate.toLocaleDateString('vi-VN')} - {dateRange.endDate.toLocaleDateString('vi-VN')}
          </div>
        )}
      </Space>
    </div>
  );
};

export default MyDateRangePicker; 