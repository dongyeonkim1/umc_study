import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import useGetLpDetail from "../hooks/queries/useGetLpDetail"; // ← LP 상세 정보 불러오는 훅
import CommentList from "../components/CommentList";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const { data: lpData, isLoading, isError } = useGetLpDetail(Number(lpId));

  useEffect(() => {
    if (!accessToken) {
      const confirmed = window.confirm("로그인이 필요한 서비스입니다. 로그인해주세요!");
      if (confirmed) {
        navigate("/login");
      } else {
        navigate("/");
      }
    }
  }, [accessToken, navigate]);

  if (!accessToken || isLoading) return <div>Loading...</div>;
  if (isError || !lpData) return <div>해당 LP를 찾을 수 없습니다.</div>;

  console.log("lpData:", lpData);

  return (
    <div className="p-6 flex flex-col items-center text-white">
      <h1 className="text-2xl font-bold mb-4">{lpData.title}</h1>
      <div className="relative w-60 h-60 mb-4">
        <img
          src={lpData.thumbnail}
          className="w-full h-full object-cover rounded-full animate-spin-slow"
        />
      <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" />
      </div>
      <p className="mt-4 text-center">{lpData.content}</p>

      {/* 태그들 */}
      {/* <div className="flex flex-wrap gap-2 mt-4">
        {lpData.tags.map((tag) => (
            <span key={tag.id} className="px-3 py-1 bg-zinc-700 rounded-full text-white text-sm">
                #{tag.name}
            </span>
        ))}
      </div> */}
      {/* 태그들 */}
      <div className="flex flex-wrap gap-2 mt-4 min-h-[1.5rem]">
        {lpData.tags && lpData.tags.length > 0 ? (
          lpData.tags.map((tag) => (
            <span key={tag.id} className="px-3 py-1 bg-zinc-700 rounded-full text-white text-sm">
              #{tag.name}
            </span>
          ))
        ) : (
          <span className="text-sm text-zinc-400">태그 없음</span>
        )}
      </div>
    

      {/* 버튼 UI만 */}
      <div className="flex space-x-4 mt-6">
        <button className="text-sm text-pink-500 hover:underline">❤️ 좋아요</button>
        <button className="text-sm text-pink-500 hover:underline">수정</button>
        <button className="text-sm text-pink-500 hover:underline">삭제</button>
      </div>

      <CommentList />
    </div>
  );
};

export default LpDetailPage;