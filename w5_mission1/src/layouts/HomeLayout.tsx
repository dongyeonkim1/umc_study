import { Outlet, useNavigate } from "react-router-dom";

const HomeLayout = () => {

    const navigate = useNavigate();
    
    return (
        <div className="h-dvh flex flex-col text-white-600">
            <nav className="w-full flex justify-between items-center px-6 py-4 bg-zinc-900">
                <button onClick={() => navigate("/")} className="text-pink-500 text-xl font-bold bg-zinc-900">돌려돌려LP판</button> 
                <div className="space-x-2">
                <button onClick={() => navigate("/login")} className="px-3 py-1 text-sm bg-zinc-800 hover:bg-zinc-700 text-white rounded">
                    로그인
                </button>
                <button onClick={() => navigate("/signup")} className="px-3 py-1 text-sm bg-pink-500 hover:bg-pink-600 text-white rounded">
                    회원가입
                </button>
                </div>
            </nav>
            <main className="flex-1 h-full">
                <Outlet />
            </main>
            <footer className="pb-7 text-pink-600">week5_DORA @pongyeonkim</footer>
        </div>
    );
};

export default HomeLayout;