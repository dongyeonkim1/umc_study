import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
    <div className="h-dvh w-full flex flex-col text-white bg-black relative">
     
      <Navbar toggleSidebar={() => setSidebarOpen((prev) => !prev)} />

      <div className="flex flex-1 relative overflow-hidden h-screen">
        {/* Sidebar */}
        <aside
          className={`w-40 bg-zinc-900 p-4 space-y-4 absolute md:relative z-20 transition-transform duration-300 ease-in-out transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button className="block text-left">찾기</button>
          <button className="block text-left" onClick={() => navigate("/my")}>마이페이지</button>
          <div className="mt-20 text-center">
            <button className="text-sm text-gray-400 mt-70">탈퇴하기</button>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="absolute inset-0 z-10"
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
