// src/dashboard/student/routine.tsx

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const timeSlots = [
  "8:30 AM - 10:00 AM",
  "10:00 AM - 11:30 AM",
  "11:30 AM - 1:00 PM",
  "2:00 PM - 3:30 PM",
  "3:30 PM - 5:00 PM",
];

export default function RoutineViewer() {
  const [routineData, setRoutineData] = useState<Record<
    string,
    Record<string, { course: string; room: string; teacher: string }>
  > | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("classRoutine");
    if (stored) {
      setRoutineData(JSON.parse(stored));
    }
  }, []);

  if (!routineData) {
    return (
      <div className="w-full p-6">
        <h2 className="text-xl font-semibold">No routine available</h2>
        <p className="text-muted-foreground">Admin has not added any class routine yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">Weekly Routine</h1>
      <Card>
        <CardHeader className="bg-blue-900 text-white px-6 py-4">
          <CardTitle className="text-center">CLASS ROUTINE</CardTitle>
        </CardHeader>
        <div className="p-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
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
                  {timeSlots.map((time) => {
                    const cls = routineData[day]?.[time];
                    return (
                      <td key={`${day}-${time}`} className="border p-2 align-top">
                        {cls?.course ? (
                          <div className="bg-blue-50 p-2 rounded shadow">
                            <div className="font-bold text-blue-800">{cls.course}</div>
                            <div className="text-xs mt-1">{cls.room}</div>
                            <div className="text-xs text-gray-600">{cls.teacher}</div>
                          </div>
                        ) : (
                          <div className="text-gray-400 text-xs text-center">No class</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
