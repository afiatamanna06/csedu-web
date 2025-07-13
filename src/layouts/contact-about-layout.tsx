import { Link, Outlet } from "@tanstack/react-router";

interface LayoutProps {
  currentPage: 'home' | 'about' | 'programs' | 'faculty' | 'research' | 'contact';
}

export default function Layout({ currentPage }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 overflow-hidden rounded-md mr-3">
              <img src="/images/csedu_logo.svg" alt="CSEDU Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-[#13274C]">CSEDU</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={`${currentPage === 'home' ? 'bg-[#FFB606] text-white px-2 py-1 rounded' : 'text-[#13274C] hover:text-[#FFB606]'}`}>Home</Link>
            <Link to="/" className={`${currentPage === 'about' ? 'bg-[#FFB606] text-white px-2 py-1 rounded' : 'text-[#13274C] hover:text-[#FFB606]'}`}>About</Link>
            <Link to="/" className={`${currentPage === 'programs' ? 'bg-[#FFB606] text-white px-2 py-1 rounded' : 'text-[#13274C] hover:text-[#FFB606]'}`}>Programs</Link>
            <Link to="/" className={`${currentPage === 'faculty' ? 'bg-[#FFB606] text-white px-2 py-1 rounded' : 'text-[#13274C] hover:text-[#FFB606]'}`}>Faculty</Link>
            <Link to="/" className={`${currentPage === 'research' ? 'bg-[#FFB606] text-white px-2 py-1 rounded' : 'text-[#13274C] hover:text-[#FFB606]'}`}>Research</Link>
            <Link to="/" className={`${currentPage === 'contact' ? 'bg-[#FFB606] text-white px-2 py-1 rounded' : 'text-[#13274C] hover:text-[#FFB606]'}`}>Contact</Link>
          </nav>
        </div>
      </header>

      {/* Department Title */}
      <div className="bg-[#13274C] text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Department of Computer Science and Engineering</h1>
          <p className="text-xl mt-2">University of Dhaka</p>
        </div>
      </div>

      {/* Main Content with Outlet */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <Outlet /> {/* This is where nested routes render */}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#2B1472] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src="/images/csedu_logo.svg" alt="CSEDU Logo" className="w-16 mb-4" />
              <p className="font-semibold">
                Department of Computer Science and Engineering<br />
                <span className="font-bold">(CSEDU)</span><br />
                Dhaka University Campus, Dhaka-1000.
              </p>
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Contact</h4>
                <div className="border-t-4 border-yellow-500 w-10 mb-2"></div>
                <p className="flex items-center gap-2">
                  📧 <a href="mailto:office@cse.du.ac.bd" className="text-white">office@cse.du.ac.bd</a>
                </p>
                <p className="flex items-center gap-2">
                  📧 <a href="mailto:chairman.cse@du.ac.bd" className="text-white">chairman.cse@du.ac.bd</a>
                </p>
                <p className="flex items-center gap-2">
                  📞 +88 09666 911 463 (Ext7421)
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <div className="border-t-4 border-yellow-500 w-10 mb-4"></div>
              <ul className="space-y-2 text-gray-200">
                <li><a href="#">About</a></li>
                <li><a href="#">Academic</a></li>
                <li><a href="#">Research Areas</a></li>
                <li><a href="#">Publications</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <div className="border-t-4 border-yellow-500 w-10 mb-4"></div>
              <ul className="space-y-2 text-gray-200">
                <li><a href="#">Faculty</a></li>
                <li><a href="#">Scholarship and Financial Aids</a></li>
                <li><a href="#">Foreign Student Admission Fees</a></li>
              </ul>
            </div>

            <div className="flex flex-col justify-end items-end">
              <div className="mb-2">Follow us on</div>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/facebook-icon.png" alt="Facebook" className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-400 mt-8 pt-4 text-center text-sm text-gray-300">
            © 2025 University of Dhaka. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
