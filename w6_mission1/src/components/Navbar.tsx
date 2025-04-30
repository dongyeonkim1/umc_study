import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    
    const navigate = useNavigate();
    const {accessToken} = useAuth();

    return (
        <nav className="w-full flex justify-between items-center px-6 py-4 bg-zinc-900">
                <button onClick={() => navigate("/")} className="text-pink-500 text-xl font-bold bg-zinc-900">돌려돌려LP판</button> 
                <div className="flex space-x-2">
                    {!accessToken && (
                        <>
                            <button onClick={() => navigate("/login")} className="px-3 py-1 text-sm bg-zinc-800 hover:bg-zinc-700 text-white rounded">
                                로그인
                            </button>
                            <button onClick={() => navigate("/signup")} className="px-3 py-1 text-sm bg-pink-500 hover:bg-pink-600 text-white rounded">
                                회원가입
                            </button>
                        </>
                    )}

                    {accessToken && (
                        <button onClick={() => navigate("/my")} className="px-3 py-1 text-sm bg-zinc-800 hover:bg-zinc-700 text-white rounded">
                        마이페이지
                        </button>
                    )}
                    <button onClick={() => navigate("")} className="px-3 py-1 text-sm bg-zinc-800 hover:bg-zinc-700 text-white rounded">
                        검색
                    </button>
                </div>
        </nav>
    );
};

export default Navbar;