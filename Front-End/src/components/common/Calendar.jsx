// src/components/ui/calendar.jsx

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CustomCalendar = ({ value, onChange }) => {
  // Nếu bạn muốn tự quản lý trạng thái ngày, có thể dùng state ở đây:
  const [date, setDate] = useState(value || new Date());

  const handleChange = (selectedDate) => {
    setDate(selectedDate);
    if (onChange) onChange(selectedDate);
  };

  return (
    <div className="custom-calendar-wrapper">
      <Calendar
        onChange={handleChange}
        value={date}
      />
    </div>
  );
};

export default CustomCalendar;
