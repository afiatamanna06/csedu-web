import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { RefreshCw, Plus } from "lucide-react";

interface Room {
  id: string;
  location: string;
  capacity: number;
}

interface BookingRequest {
  id: string;
  room: string;
  courseCode: string;
  date: string;
  time: string;
  requester: string;
  purpose: string;
  status: "Pending" | "Accepted" | "Rejected";
}

const RoomManagement = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([
    {
      id: "1",
      room: "Room 101",
      courseCode: "CSE-101",
      date: "2024-07-20",
      time: "10:00 AM - 12:00 PM",
      requester: "Alice Johnson",
      purpose: "Project Meeting",
      status: "Pending"
    },
    {
      id: "2",
      room: "Room 202",
      courseCode: "CSE-201",
      date: "2024-07-21",
      time: "02:00 PM - 04:00 PM",
      requester: "Bob Williams",
      purpose: "Presentation Practice",
      status: "Accepted"
    },
    {
      id: "3",
      room: "Room 103",
      courseCode: "CSE-301",
      date: "2024-07-22",
      time: "11:00 AM - 01:00 PM",
      requester: "Charlie Brown",
      purpose: "Group Study",
      status: "Rejected"
    },
    {
      id: "4",
      room: "Room 201",
      courseCode: "CSE-401",
      date: "2024-07-23",
      time: "09:00 AM - 11:00 AM",
      requester: "Diana Green",
      purpose: "Seminar",
      status: "Pending"
    },
    {
      id: "5",
      room: "Room 102",
      courseCode: "CSE-402",
      date: "2024-07-24",
      time: "03:00 PM - 05:00 PM",
      requester: "Ethan White",
      purpose: "Workshop",
      status: "Accepted"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/room/all");
      if (!response.ok) throw new Error("Failed to fetch rooms");
      const data = await response.json();
      setRooms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:8000/booking/${bookingId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update booking status");

      setBookingRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === bookingId
            ? { ...request, status: newStatus as "Pending" | "Accepted" | "Rejected" }
            : request
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update booking status");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Booking Requests</h1>
          <p className="text-gray-600">Manage room bookings and room inventory.</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={fetchRooms}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Rooms
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Room
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <p>{error}</p>
        </Alert>
      )}

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 bg-yellow-400 p-3 rounded-t-lg">
          Booking Requests
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="p-3">Room</th>
                <th className="p-3">Course Code</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Requester</th>
                <th className="p-3">Purpose</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookingRequests.map((request) => (
                <tr key={request.id} className="border-t">
                  <td className="p-3">{request.room}</td>
                  <td className="p-3">{request.courseCode}</td>
                  <td className="p-3">{request.date}</td>
                  <td className="p-3">{request.time}</td>
                  <td className="p-3">{request.requester}</td>
                  <td className="p-3">{request.purpose}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        request.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="p-3">
                    {request.status === "Pending" && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleStatusChange(request.id, "Accepted")}
                          className="bg-green-500 hover:bg-green-600 text-white"
                          size="sm"
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() => handleStatusChange(request.id, "Rejected")}
                          className="bg-red-500 hover:bg-red-600 text-white"
                          size="sm"
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    {request.status === "Accepted" && (
                      <Button
                        onClick={() => handleStatusChange(request.id, "Rejected")}
                        className="bg-red-500 hover:bg-red-600 text-white"
                        size="sm"
                      >
                        Reject
                      </Button>
                    )}
                    {request.status === "Rejected" && (
                      <Button
                        onClick={() => handleStatusChange(request.id, "Accepted")}
                        className="bg-green-500 hover:bg-green-600 text-white"
                        size="sm"
                      >
                        Accept
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 bg-yellow-400 p-3 rounded-t-lg">
          All Rooms
        </h2>
        {loading ? (
          <p className="text-center py-4">Loading rooms...</p>
        ) : rooms.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="p-3">Room ID</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Capacity</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id} className="border-t">
                    <td className="p-3">{room.id}</td>
                    <td className="p-3">{room.location}</td>
                    <td className="p-3">{room.capacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <p className="text-gray-600">Get started by adding a new room.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RoomManagement; 