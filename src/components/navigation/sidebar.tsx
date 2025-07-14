import { Link, useRouterState } from "@tanstack/react-router";
import { Avatar } from "@/components/ui/avatar";


export interface SidebarLink {
  label: string;
  path: string;
}

interface SidebarProps {
  title: string;
  links: SidebarLink[];
  onLinkClick?: () => void;
  profileLink: string;
}
// export default function Sidebar({ title, links, onLinkClick }: SidebarProps) {
export default function Sidebar({ title, links, onLinkClick, profileLink }: SidebarProps) {
  const { location } = useRouterState();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center gap-3">
        <Link to={profileLink} onClick={onLinkClick}>
          <Avatar className="w-10 h-10">
            <img 
              src={title.includes("Faculty") 
                ? "https://randomuser.me/api/portraits/men/36.jpg" 
                : "https://randomuser.me/api/portraits/women/40.jpg"} 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </Avatar>
        </Link>
        <div className="font-bold text-lg">{title}</div>
      </div>
      <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={onLinkClick}
            // className={`p-2 rounded hover:bg-blue-100 ${
            //   location.pathname === link.path ? "bg-blue-200" : ""
            // }`}
            className={`p-2 rounded hover:bg-blue-100 ${location.pathname === link.path ? "bg-blue-200" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
