import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./MyDateRangePicker.css";

const MyDateRangePicker = ({ onChange }) => {
  const today = new Date();
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

  const [range, setRange] = useState({
    startDate: today,
    endDate: nextMonth,
    key: "selection",
  });

  const handleSelect = (ranges) => {
    setRange(ranges.selection);
    if (onChange) {
      onChange(ranges.selection);
    }
  };

  const diffDays = Math.ceil(
    (range.endDate.getTime() - range.startDate.getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  return (
    <>
        <div className="selected-days">
            Đã chọn: <strong>{diffDays}</strong> ngày
        </div>
        <div className="date-picker-wrapper">
            <style>{`
                .rdrDaySelected,
                .rdrDayInRange {
                background-color: #ff4d4f !important; /* màu đỏ */
                color: white !important;
                }

                .rdrDayStartOfRange {
                border-top-left-radius: 50% !important;
                border-bottom-left-radius: 50% !important;
                background-color: #ff4d4f !important;
                }

                .rdrDayEndOfRange {
                border-top-right-radius: 50% !important;
                border-bottom-right-radius: 50% !important;
                background-color: #ff4d4f !important;
                }
            `}</style>

            <DateRange
                editableDateInputs={true}
                onChange={handleSelect}
                moveRangeOnFirstSelection={false}
                ranges={[range]}
                months={2}
                direction="horizontal"
                minDate={new Date()}
                showMonthAndYearPickers={true}
            />
        </div>
    </>

  );
};

export default MyDateRangePicker;
