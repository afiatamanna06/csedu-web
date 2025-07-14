import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const EquipmentBooking = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);

  const equipmentList = [
    {
      id: "laptop",
      name: "Laptop",
      fee: 1000,
      available: 15,
      description: "High-performance laptops for academic use",
    },
    {
      id: "projector",
      name: "Projector",
      fee: 500,
      available: 8,
      description: "HD projectors for presentations",
    },
    {
      id: "camera",
      name: "Digital Camera",
      fee: 800,
      available: 5,
      description: "Professional cameras for events and projects",
    },
    {
      id: "microphone",
      name: "Microphone Set",
      fee: 300,
      available: 10,
      description: "Wireless microphones for presentations and events",
    },
    {
      id: "tablet",
      name: "Graphics Tablet",
      fee: 600,
      available: 7,
      description: "Digital drawing tablets for design work",
    },
    {
      id: "printer",
      name: "Color Printer",
      fee: 400,
      available: 3,
      description: "High-quality color printers for project work",
    },
  ];

  const handleEquipmentToggle = (equipmentId: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(equipmentId)
        ? prev.filter((id) => id !== equipmentId)
        : [...prev, equipmentId]
    );
  };

  const calculateTotalFee = () => {
    return equipmentList
      .filter((equipment) => selectedEquipment.includes(equipment.id))
      .reduce((total, equipment) => total + equipment.fee, 0);
  };

  return (
    <div className="p-8 space-y-8 bg-[#0F2545] min-h-screen">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-[20px] p-10 shadow-lg">
          <h2 className="text-4xl font-bold text-[#0F2545] mb-6">Equipment Booking</h2>
          <p className="text-gray-700 text-xl">
            Book laboratory and academic equipment for your projects and research work.
            A refundable security deposit is required for all equipment bookings.
          </p>
        </div>

        {/* Equipment Selection */}
        <div className="bg-white rounded-[20px] p-10 shadow-lg">
          <h3 className="text-2xl font-bold text-[#0F2545] mb-6">Available Equipment</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipmentList.map((equipment) => (
              <Card
                key={equipment.id}
                className={`p-6 rounded-[15px] border-2 transition-all ${
                  selectedEquipment.includes(equipment.id)
                    ? "border-[#F39C12] shadow-md"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <Checkbox
                    id={equipment.id}
                    checked={selectedEquipment.includes(equipment.id)}
                    onCheckedChange={() => handleEquipmentToggle(equipment.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={equipment.id}
                      className="text-xl font-semibold text-[#0F2545] cursor-pointer"
                    >
                      {equipment.name}
                    </Label>
                    <p className="text-gray-600 mt-1">{equipment.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-[#F39C12] font-bold text-lg">
                        ৳ {equipment.fee}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {equipment.available} available
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-[20px] p-10 shadow-lg">
          <h3 className="text-2xl font-bold text-[#0F2545] mb-6">Booking Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="purpose" className="text-lg font-medium text-[#0F2545]">
                  Purpose of Booking
                </Label>
                <select
                  id="purpose"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Select purpose</option>
                  <option value="project">Course Project</option>
                  <option value="research">Research Work</option>
                  <option value="event">Department Event</option>
                  <option value="personal">Personal Use</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-lg font-medium text-[#0F2545]">
                  Start Date
                </Label>
                <Input type="date" id="start-date" className="w-full" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-lg font-medium text-[#0F2545]">
                  End Date
                </Label>
                <Input type="date" id="end-date" className="w-full" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supervisor" className="text-lg font-medium text-[#0F2545]">
                  Supervising Faculty (if applicable)
                </Label>
                <Input
                  type="text"
                  id="supervisor"
                  placeholder="Faculty name"
                  className="w-full"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-[15px]">
              <h4 className="text-xl font-bold text-[#0F2545] mb-4">Booking Summary</h4>

              {selectedEquipment.length > 0 ? (
                <div className="space-y-4">
                  {equipmentList
                    .filter((equipment) => selectedEquipment.includes(equipment.id))
                    .map((equipment) => (
                      <div key={equipment.id} className="flex justify-between items-center">
                        <span className="text-gray-700">{equipment.name}</span>
                        <span className="text-[#0F2545] font-semibold">
                          ৳ {equipment.fee}
                        </span>
                      </div>
                    ))}

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#0F2545] font-bold">Total Fee</span>
                      <span className="text-[#0F2545] font-bold text-xl">
                        ৳ {calculateTotalFee()}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
                      A security deposit of ৳ {calculateTotalFee() * 0.5} will be required at the time of pickup.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No equipment selected</p>
              )}

              <Button
                className="w-full mt-6 bg-[#F39C12] hover:bg-[#E67E22] text-white py-6 rounded-xl font-bold text-xl transition-colors"
                disabled={selectedEquipment.length === 0}
              >
                Proceed to Booking
              </Button>
            </div>
          </div>
        </div>

        {/* User Manual */}
        <div className="bg-white rounded-[20px] p-10 shadow-lg">
          <h3 className="text-2xl font-bold text-[#0F2545] mb-6">How to Book Equipment</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 text-lg">
            <li>Select the equipment you wish to book by ticking the checkbox.</li>
            <li>Fill in the purpose, duration, and supervisor (if any) under "Booking Details".</li>
            <li>Review your selection in the "Booking Summary" section.</li>
            <li>
              Click <span className="font-semibold text-[#F39C12]">"Proceed to Booking"</span> to
              submit your request.
            </li>
            <li>Wait for admin approval before collecting your equipment.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default EquipmentBooking;
