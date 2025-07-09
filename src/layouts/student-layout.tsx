import { useState } from "react";
import StudentSidebar from "@/components/navigation/student-sidebar";
import { Outlet } from "@tanstack/react-router";
import { Menu, X } from "lucide-react"; // icons for hamburger and close

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Toggle sidebar open/close
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/* Mobile top nav with menu button */}
      <header className="fixed top-[4.35rem] left-0 right-0 bg-white shadow-md lg:hidden flex items-center justify-between px-4 h-16 z-30">
        <h1 className="font-bold text-lg">Student Dashboard</h1>
        <button
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <div className="flex mt-16 lg:mt-[8rem] min-h-[calc(100vh-8rem)]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 bg-white border-r shadow-md">
          <div className="sticky top-[8rem] h-[calc(100vh-8rem)] overflow-y-auto">
            <StudentSidebar onLinkClick={() => {}} />
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside
          className={`fixed top-[4.35rem] bottom-0 left-0 z-50 w-64 bg-white border-r shadow-md overflow-y-auto transform transition-transform duration-300 ease-in-out lg:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <StudentSidebar onLinkClick={() => setSidebarOpen(false)} />
        </aside>

        {/* Main content */}
        <div className="flex-1">
          <main className="pt-20 lg:pt-6 px-6 pb-6 bg-gray-50 min-h-[calc(100vh-8rem)]">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
