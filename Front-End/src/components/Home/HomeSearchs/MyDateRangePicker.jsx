import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const MyDateRangePicker = () => {
    const [selectedRange, setSelectedRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    return (
        <DateRange
            editableDateInputs={true}
            onChange={(ranges) => setSelectedRange(ranges.selection)}
            moveRangeOnFirstSelection={false}
            ranges={[selectedRange]}
        />
    );
};

export default MyDateRangePicker;
