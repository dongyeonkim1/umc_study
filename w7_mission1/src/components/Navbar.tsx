import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLogoutMutation } from "../hooks/mutations/useLogoutMutation";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../apis/auth";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  // ✅ name만 구독하여 변경 시 Navbar 리렌더링 유도
  const { data: userName } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    select: (res) => res.data.name,
    enabled: !!accessToken,
  });

  const { mutate: logout } = useLogoutMutation();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-zinc-900">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-2xl font-bold focus:outline-none text-white"
        >
          =
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-pink-500 text-xl font-bold bg-zinc-900"
        >
          돌려돌려LP판
        </button>
      </div>
      <div className="flex space-x-2">
        {!accessToken ? (
          <>
            <h2>🔍︎</h2>
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-1 text-sm bg-zinc-800 hover:bg-zinc-700 text-white rounded"
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-3 py-1 text-sm bg-pink-500 hover:bg-pink-600 text-white rounded"
            >
              회원가입
            </button>
          </>
        ) : (
          <div className="flex space-x-3">
            <h2>🔍︎</h2>
            <h2 className="px-3 py-1 text-sm text-white rounded">
              {userName ?? "사용자"}님 반갑습니다
            </h2>
            <button
              onClick={() => logout()}
              className="px-3 py-1 text-sm bg-zinc-800 hover:bg-zinc-700 text-white rounded"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
