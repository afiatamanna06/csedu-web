// @/layouts/student-layout.tsx
import StudentSidebar from "@/components/navigation/student-sidebar";
import { Outlet } from "@tanstack/react-router";

export default function StudentLayout() {
  return (
    <div className="flex mt-[4rem] lg:mt-[8rem] min-h-[calc(100vh-8rem)]">
      {/* Sticky, scrollable sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r shadow-md">
        <div className="sticky top-[8rem] h-[calc(100vh-8rem)] overflow-y-auto">
          <StudentSidebar />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <main className="p-6 bg-gray-50 h-[130rem]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

