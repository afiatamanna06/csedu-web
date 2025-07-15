import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/utils/get-initials";

interface Staff {
  name: string;
  title: string;
  email: string;
  phone: string;
  photo: string;
}

const staffMembers: Staff[] = [
  {
    name: "Md. Haniful Hassan Siddique",
    title: "Superintending Engineer",
    email: "hanif@du.ac.bd",
    phone: "01552410301",
    photo: "/staffs/staff1.png",
  },
  {
    name: "Md. Shahjalu Islam",
    title: "Principal Technical Officer",
    email: "shahjalu@cse.du.ac.bd",
    phone: "01917505608",
    photo: "/staffs/staff2.jpg",
  },
  {
    name: "Md. Aynul Huqe",
    title: "Senior Technical Officer",
    email: "aynulhoqe86@gmail.com",
    phone: "02226863029",
    photo: "/staffs/staff3.jpg",
  },
  {
    name: "Paritosh Chakma",
    title: "Senior Administrative Officer",
    email: "pari_chakma@yahoo.com",
    phone: "8802226683029",
    photo: "/staffs/staff4.jpg",
  },
  {
    name: "Md. Shahnewaz Islam",
    title: "Senior Technical Officer",
    email: "shahnewaz@cse.du.ac.bd",
    phone: "02226683029",
    photo: "/staffs/staff5.jpg",
  },
  {
    name: "Md. Alauddin",
    title: "Technical Officer",
    email: "alauddin@cse.du.ac.bd",
    phone: "02226683029",
    photo: "/staffs/staff6.jpg",
  },
  {
    name: "Md. Aminul Islam",
    title: "Senior Assistant",
    email: "aminul@cse.du.ac.bd",
    phone: "01553422493",
    photo: "/staffs/staff7.jpg",
  },
  {
    name: "Balai Chandra Das",
    title: "Lab Assistant",
    email: "balaichdas2012@gmail.com",
    phone: "01718763366",
    photo: "/staffs/staff8.jpg",
  },
  {
    name: "Md. Abu Taleb",
    title: "Senior Office Shahayak Gr-3",
    email: "mdabutaleb197010@gmail.com",
    phone: "01775863524",
    photo: "/staffs/staff9.jpg",
  },
  {
    name: "Mohammad Rafiqul Islam",
    title: "Senior Lab. Attendent Gr-3",
    email: "rafi@cse.du.ac.bd",
    phone: "01552479757",
    photo: "/staffs/staff10.jpg",
  },
  {
    name: "Md. Khayrul Rahman",
    title: "Laboratory Attendant",
    email: "khayrulrahman@gmail.com",
    phone: "01829399567",
    photo: "/staffs/staff11.jpg",
  },
  {
    name: "Muhammad Masudur Rahman",
    title: "Laboratory Attendant",
    email: "masudur@cse.du.ac.bd",
    phone: "01933452466",
    photo: "/staffs/staff12.jpg",
  },
  {
    name: "Robiul Islam",
    title: "Laboratory Attendant",
    email: "robiulislamengr38@gmail.com",
    phone: "01771523399",
    photo: "/staffs/staff13.jpg",
  },
  {
    name: "Md.Imran Ansary",
    title: "Office Shahayak",
    email: "imranansary731@gmail.com",
    phone: "01770761417",
    photo: "/staffs/staff14.jpeg",
  },
  {
    name: "Md. Sahidullah",
    title: "Parichannata Karmi",
    email: "aminulopias@yahoo.com",
    phone: "01748622892",
    photo: "/staffs/staff15.jpg",
  },
];

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
