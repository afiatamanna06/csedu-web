import * as React from 'react';
import { Link } from '@tanstack/react-router';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Menu, X, Search } from 'lucide-react';

type NavItem = {
  name: string;
  href?: string;
  submenu?: NavItem[];
};

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Academic', href: '/academic' },
    {
      name: 'People',
      submenu: [
        {
          name: 'Faculty Members',
          submenu: [
            { name: 'All', href: '/people/faculty/all' },
            { name: 'Position', href: '/people/faculty/position' },
            { name: 'Research', href: '/people/faculty/research' },
          ],
        },
        { name: 'Officers and Staffs', href: '/people/staffs' },
      ],
    },
    { name: 'Research', href: '/research' },
    { name: 'Student', href: '/student' },
    { name: 'Alumni', href: '/alumni' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Navbar */}
      <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="font-bold text-lg">
            CSE DU
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-6 items-center">
            {navItems.map((item, index) => (
              <DesktopMenuItem key={index} item={item} />
            ))}

            {/* Search Button */}
            <Drawer open={searchOpen} onOpenChange={setSearchOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="p-4">
                  <input
                    type="text"
                    placeholder="Search here..."
                    className="w-full border rounded p-2"
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-sm">
            {navItems.map((item, index) => (
              <MobileMenuItem key={index} item={item} />
            ))}
            {/* Mobile Search */}
            <Button
              variant="ghost"
              className="w-full flex justify-start p-4"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="mr-2" /> Search
            </Button>
          </div>
        )}
      </nav>
    </>
  );
};

const DesktopMenuItem: React.FC<{ item: NavItem }> = ({ item }) => {
  if (!item.submenu) {
    return (
      <Link to={item.href!} className="hover:text-blue-600 transition">
        {item.name}
      </Link>
    );
  }

  return (
    <div className="relative group">
      <button className="hover:text-blue-600 transition">{item.name}</button>
      <div className="absolute left-0 top-full bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
        {item.submenu.map((sub, idx) => (
          <div key={idx} className="relative group">
            {sub.submenu ? (
              <>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  {sub.name}
                </button>
                <div className="absolute left-full top-0 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                  {sub.submenu.map((deep, deepIdx) => (
                    <Link
                      key={deepIdx}
                      to={deep.href!}
                      className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                    >
                      {deep.name}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link
                to={sub.href!}
                className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
              >
                {sub.name}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const MobileMenuItem: React.FC<{ item: NavItem }> = ({ item }) => {
  const [open, setOpen] = React.useState(false);

  if (!item.submenu) {
    return (
      <Link to={item.href!} className="block px-4 py-2 hover:bg-gray-100">
        {item.name}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        {item.name}
      </button>
      {open && (
        <div className="pl-4 border-l">
          {item.submenu.map((sub, idx) => (
            <div key={idx}>
              {!sub.submenu ? (
                <Link to={sub.href!} className="block px-4 py-2 hover:bg-gray-100">
                  {sub.name}
                </Link>
              ) : (
                <MobileSubMenu item={sub} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MobileSubMenu: React.FC<{ item: NavItem }> = ({ item }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-2 hover:bg-gray-100"
      >
        {item.name}
      </button>
      {open && (
        <div className="pl-4 border-l">
          {item.submenu?.map((sub, idx) => (
            <Link key={idx} to={sub.href!} className="block px-4 py-2 hover:bg-gray-100">
              {sub.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

