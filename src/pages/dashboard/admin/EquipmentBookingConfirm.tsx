import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  studentName: string;
  purpose: string;
  equipment: string[];
  startDate: string;
  endDate: string;
  status: "Pending" | "Confirmed" | "Rejected";
}

const EquipmentBookingConfirm = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "BK001",
      studentName: "Afiat Tamanna",
      purpose: "Course Project",
      equipment: ["Laptop", "Projector"],
      startDate: "2025-07-20",
      endDate: "2025-07-24",
      status: "Pending",
    },
    {
      id: "BK002",
      studentName: "Joty Akter",
      purpose: "Department Event",
      equipment: ["Microphone Set"],
      startDate: "2025-07-25",
      endDate: "2025-07-26",
      status: "Pending",
    },
  ]);

  const updateStatus = (id: string, newStatus: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  return (
    <div className="p-10 bg-[#0F2545] min-h-screen text-white">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div className="bg-white rounded-[20px] p-10 shadow-lg">
          <h2 className="text-4xl font-bold text-[#0F2545] mb-6">
            Equipment Booking Confirmation
          </h2>
          <p className="text-gray-700 text-xl">
            Review student equipment booking requests and take action.
          </p>
        </div>

        {bookings.length === 0 ? (
          <p className="text-white text-lg">No bookings available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="bg-white p-6 rounded-[15px] space-y-4 shadow-md">
                <div className="text-[#0F2545] space-y-2">
                  <h3 className="text-xl font-bold">{booking.studentName}</h3>
                  <p><span className="font-semibold">Booking ID:</span> {booking.id}</p>
                  <p><span className="font-semibold">Purpose:</span> {booking.purpose}</p>
                  <p><span className="font-semibold">Duration:</span> {booking.startDate} → {booking.endDate}</p>
                  <p><span className="font-semibold">Equipment:</span> {booking.equipment.join(", ")}</p>
                  <p>
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={
                        booking.status === "Confirmed"
                          ? "text-green-600 font-bold"
                          : booking.status === "Rejected"
                          ? "text-red-600 font-bold"
                          : "text-yellow-600 font-bold"
                      }
                    >
                      {booking.status}
                    </span>
                  </p>
                </div>

                {booking.status === "Pending" && (
                  <div className="flex gap-4 mt-4">
                    <Button
                      className="bg-[#F39C12] hover:bg-[#e48d0e] text-white font-semibold px-4 py-2 rounded-md"
                      onClick={() => updateStatus(booking.id, "Confirmed")}
                    >
                      Confirm
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md"
                      onClick={() => updateStatus(booking.id, "Rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentBookingConfirm;
