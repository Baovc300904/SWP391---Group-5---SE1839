import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const MyDateRangePicker = () => {
    const [selectedRange, setSelectedRange] = useState(null);

    // code xử lý...

    return (
        <DateRange
            // props...
            onChange={(ranges) => setSelectedRange(ranges.selection)}
            ranges={[selectedRange || { startDate: new Date(), endDate: new Date(), key: 'selection' }]}
        />
    );
};

export default MyDateRangePicker;
