// src/pages/admin/routineAdd/routine-add.tsx

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from '@tanstack/react-router';


const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const timeSlots = [
  "8:30 AM - 10:00 AM",
  "10:00 AM - 11:30 AM",
  "11:30 AM - 1:00 PM",
  "2:00 PM - 3:30 PM",
  "3:30 PM - 5:00 PM",
];

export default function RoutineAdd() {
  const [routineData, setRoutineData] = useState(() =>
    weekDays.reduce((acc, day) => {
      acc[day] = timeSlots.reduce((slotAcc, time) => {
        slotAcc[time] = { course: "", room: "", teacher: "" };
        return slotAcc;
      }, {} as Record<string, { course: string; room: string; teacher: string }>);
      return acc;
    }, {} as Record<string, Record<string, { course: string; room: string; teacher: string }>>)
  );

  const navigate = useNavigate();

  const handleChange = (
    day: string,
    time: string,
    field: "course" | "room" | "teacher",
    value: string
  ) => {
    setRoutineData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: {
          ...prev[day][time],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = () => {
  localStorage.setItem("classRoutine", JSON.stringify(routineData));
  alert("Routine saved successfully.");
  navigate({ to: "/dashboard/student/semester-routine" });
};

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">Admin: Add Routine</h1>
      <Card>
        <CardHeader className="bg-blue-900 text-white px-6 py-4">
          <CardTitle className="text-center">Input Class Routine</CardTitle>
        </CardHeader>
        <div className="p-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Day / Time</th>
                {timeSlots.map((time) => (
                  <th key={time} className="border p-2">{time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weekDays.map((day) => (
                <tr key={day}>
                  <td className="border p-2 font-semibold bg-gray-50">{day}</td>
                  {timeSlots.map((time) => (
                    <td key={`${day}-${time}`} className="border p-2">
                      <Input
                        className="mb-1"
                        placeholder="Course"
                        value={routineData[day][time].course}
                        onChange={(e) => handleChange(day, time, "course", e.target.value)}
                      />
                      <Input
                        className="mb-1"
                        placeholder="Room"
                        value={routineData[day][time].room}
                        onChange={(e) => handleChange(day, time, "room", e.target.value)}
                      />
                      <Input
                        placeholder="Teacher"
                        value={routineData[day][time].teacher}
                        onChange={(e) => handleChange(day, time, "teacher", e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex justify-end">
            <Button onClick={handleSubmit}>Save Routine</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
