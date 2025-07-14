import { useState } from "react";
import SelectField from "./SelectField";

const TimeSelect = ({ selectedStartTime, selectedEndTime, onStartTimeChange, onEndTimeChange }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <SelectField
        label="Start Time"
        value={selectedStartTime}
        options={[
          "8:00 AM",
          "10:00 AM",
          "12:00 PM",
          "2:00 PM",
          "4:00 PM"
        ]}
        onChange={onStartTimeChange}
        zIndex={30}
      />
      <SelectField
        label="End Time"
        value={selectedEndTime}
        options={[
          "10:00 AM",
          "12:00 PM",
          "2:00 PM",
          "4:00 PM",
          "6:00 PM"
        ]}
        onChange={onEndTimeChange}
        zIndex={30}
      />
    </div>
  );
};

export default TimeSelect; 