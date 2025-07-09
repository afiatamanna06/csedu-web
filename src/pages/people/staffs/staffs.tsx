import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    photo: "/staff1.jpg",
  },
  {
    name: "Md. Shahjalu Islam",
    title: "Principal Technical Officer",
    email: "shahjalu@cse.du.ac.bd",
    phone: "01917505608",
    photo: "/staff2.jpg",
  },
  {
    name: "Md. Aynul Huqe",
    title: "Senior Technical Officer",
    email: "aynulhoqe86@gmail.com",
    phone: "02226863029",
    photo: "/staff3.jpg",
  },
];

export default function OfficersAndStaff() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-[4rem] lg:mt-[8rem]">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Officers and Staff
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {staffMembers.map((staff, i) => (
          <Card key={i} className="shadow-lg rounded-2xl">
            <CardContent className="p-4 flex flex-col items-center">
              <Avatar>
                <AvatarImage src={staff.photo} className="w-24 h-24 mb-4" />
                <AvatarFallback>{getInitials(staff.name)}</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold text-center">
                {staff.name}
              </h2>
              <p className="text-sm text-gray-500 text-center">{staff.title}</p>
              <p className="text-sm text-center mt-2">Email: {staff.email}</p>
              <p className="text-sm text-center">Phone: {staff.phone}</p>
              <Button className="mt-4 w-full">View</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
