import { Link, useRouterState } from "@tanstack/react-router";

export interface SidebarLink {
  label: string;
  path: string;
}

interface SidebarProps {
  title: string;
  links: SidebarLink[];
  onLinkClick?: () => void;
}

export default function Sidebar({ title, links, onLinkClick }: SidebarProps) {
  const { location } = useRouterState();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 font-bold text-lg border-b">{title}</div>
      <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={onLinkClick}
            className={`p-2 rounded hover:bg-blue-100 ${
              location.pathname === link.path ? "bg-blue-200" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
