import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

console.log("SemesterRoutine module loaded");

export default function SemesterRoutine() {
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCurrentDay = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayIndex = new Date().getDay();
    return days[dayIndex];
  };

  const currentDay = getCurrentDay();
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const timeSlots = [
    "8:30 AM - 10:00 AM",
    "10:00 AM - 11:30 AM",
    "11:30 AM - 1:00 PM",
    "1:00 PM - 2:00 PM",  // Break slot
    "2:00 PM - 3:30 PM",
    "3:30 PM - 5:00 PM",
  ];

  const classSchedule = [
    { day: "Sunday", time: "8:30 AM - 10:00 AM", course: "CSE-101", room: "Room 301", teacher: "Dr. Ahmed" },
    { day: "Sunday", time: "10:00 AM - 11:30 AM", course: "CSE-102", room: "Room 302", teacher: "Dr. Rahman" },
    { day: "Monday", time: "10:00 AM - 11:30 AM", course: "CSE-103", room: "Room 303", teacher: "Dr. Khan" },
    { day: "Tuesday", time: "11:30 AM - 1:00 PM", course: "CSE-104", room: "Lab 201", teacher: "Dr. Hasan" },
    { day: "Wednesday", time: "2:00 PM - 3:30 PM", course: "CSE-105", room: "Room 304", teacher: "Dr. Ali" },
    { day: "Thursday", time: "3:30 PM - 5:00 PM", course: "CSE-106", room: "Lab 202", teacher: "Dr. Karim" },
  ];

  const getClassForDayAndTime = (day: string, time: string) => {
    return classSchedule.find(cls => cls.day === day && cls.time === time);
  };

  const handleApplyFilter = () => {
    if (!selectedBatch && !selectedSemester) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    console.log("SemesterRoutine component mounted");
  }, []);

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">Semester Routine</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">Batch</label>
          <Select value={selectedBatch} onValueChange={setSelectedBatch}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1st Year">1st Year</SelectItem>
                <SelectItem value="2nd Year">2nd Year</SelectItem>
                <SelectItem value="3rd Year">3rd Year</SelectItem>
                <SelectItem value="4th Year">4th Year</SelectItem>
                <SelectItem value="Masters">Master's</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium mb-1">Semester</label>
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1st">1st Semester</SelectItem>
                <SelectItem value="2nd">2nd Semester</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-1/3 flex items-end">
          <Button
            className="w-full"
            variant="default"
            onClick={handleApplyFilter}
            disabled={isLoading || (!selectedBatch && !selectedSemester)}
          >
            {isLoading ? "Loading..." : "Apply Filter"}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64 w-full bg-muted/20 rounded-lg border border-border">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            <p className="text-muted-foreground">Loading schedule...</p>
          </div>
        </div>
      ) : (
        <Card className="w-full overflow-hidden">
          <CardHeader className="py-4 px-6 bg-blue-900 text-white">
            <CardTitle className="text-xl font-bold text-center">
              WEEKLY CLASS SCHEDULE
            </CardTitle>
          </CardHeader>

          <div className="p-4 overflow-x-auto">
            <div className="md:hidden mb-4 p-3 bg-gray-100 rounded-md text-sm text-gray-600">
              <p>Scroll horizontally to view the complete schedule</p>
            </div>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 w-32 text-left font-medium text-gray-600">
                    Day / Time
                  </th>
                  {timeSlots.map((time) => (
                    <th
                      key={time}
                      className={`border border-gray-300 p-3 text-left font-medium ${
                        time === "1:00 PM - 2:00 PM" ? "bg-yellow-100 text-yellow-700" : "text-gray-600"
                      }`}
                    >
                      {time}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {weekDays.map((day) => (
                  <tr
                    key={day}
                    className={`hover:bg-gray-50 transition-colors ${day === currentDay ? "bg-blue-50" : ""}`}
                  >
                    <td className="border border-gray-300 p-3 font-medium bg-gray-100 text-gray-700">
                      {day}
                      {day === currentDay && (
                        <span className="ml-1 text-xs text-blue-700">(Today)</span>
                      )}
                    </td>
                    {timeSlots.map((time) => {
                      if (time === "1:00 PM - 2:00 PM") {
                        return (
                          <td
                            key={`${day}-${time}`}
                            className="border border-gray-300 p-3 text-center bg-yellow-50 text-yellow-700 font-semibold"
                          >
                            Break
                          </td>
                        );
                      }

                      const classInfo = getClassForDayAndTime(day, time);
                      return (
                        <td
                          key={`${day}-${time}`}
                          className="border border-gray-300 p-3 align-top"
                        >
                          {classInfo ? (
                            <div className="p-3 bg-blue-50 rounded-md border border-blue-200 shadow-sm">
                              <div className="font-bold text-blue-800">{classInfo.course}</div>
                              <div className="text-sm mt-1">{classInfo.room}</div>
                              <div className="text-xs text-gray-600 mt-1">{classInfo.teacher}</div>
                            </div>
                          ) : (
                            <div className="text-xs text-gray-500 text-center py-2">No class</div>
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
      )}
    </div>
  );
}
