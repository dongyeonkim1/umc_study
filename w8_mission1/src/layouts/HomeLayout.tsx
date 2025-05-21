import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar"; // 분리된 Sidebar 불러오기
import { useEffect, useState } from "react";

const HomeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col text-white bg-black relative">
      <Navbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`md:relative z-20 transition-transform duration-300 ease-in-out transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Overlay on small screens */}
        {sidebarOpen && (
          <div
            className="inset-0 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <main className="flex-1 relative z-20 mt-10 overflow-auto">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default HomeLayout;
