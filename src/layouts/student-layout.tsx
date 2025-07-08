// @/layouts/student-layout.tsx
import StudentSidebar from "@/components/navigation/student-sidebar";
import { Outlet } from "@tanstack/react-router";

export default function StudentLayout() {
  return (
    <div className="flex mt-[4rem] lg:mt-[8rem] min-h-screen">
      <StudentSidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
