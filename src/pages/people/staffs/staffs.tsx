import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/get-initials";
import { staffMembers } from "./staffs-data";

export default function OfficersAndStaff() {
  return (
    <div className="min-h-screen bg-gray-100 mt-[4rem] lg:mt-[8rem]">
      <div className="relative w-full h-[100%]">
        <img
          src="/landing.jpg"
          alt="Department Banner"
          className="w-full h-[100%] absolute object-cover"
        />
        <div className="w-full h-[100%] absolute bg-gradient-to-b from-[#13274C] to-[#13274C6f] backdrop-blur-[2px]"></div>
        <div className="relative w-full h-[15rem] md:h-[17rem] flex flex-col items-center justify-center p-6 md:p-12 lg:p-16">
          <p className="text-3xl md:text-5xl mt-8 md:mt-0 max-w-[60rem] font-bold text-white text-center">
            Officers and Staff
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:container mx-auto px-4 pt-10 pb-20">
        {staffMembers.map((staff, i) => (
          <Card
            key={i}
            className="shadow-lg shadow-[#e5ddff] border-none rounded-2xl flex flex-col p-0"
          >
            {staff.photo ? (
              <div className="pt-4 px-4 overflow-hidden">
                <img
                  src={staff.photo}
                  alt={staff.name}
                  className="w-full h-[20rem] lg:h-[20rem] rounded-xl object-cover"
                />
              </div>
            ) : (
              <Avatar className="mb-4">
                <AvatarFallback>{getInitials(staff.name)}</AvatarFallback>
              </Avatar>
            )}
            <h2 className="text-lg font-semibold px-4">{staff.name}</h2>
            <p className="text-sm text-gray-500 -mt-4 px-4">{staff.title}</p>
            <p className="text-sm px-4">Email: {staff.email}</p>
            <p className="text-sm px-4 -mt-4 pb-4">Phone: {staff.phone}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
