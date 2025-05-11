import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import useGetLpDetail from "../hooks/queries/useGetLpDetail"; // LP 상세 정보 불러오는 훅
import CommentList from "../components/CommentList";
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { deleteLike, postLike } from "../apis/lp";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import { useQueryClient } from "@tanstack/react-query";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const { data: lpData, isLoading, isError } = useGetLpDetail(Number(lpId));
  
  const {data: me} = useGetMyInfo(accessToken);
  const queryClient = useQueryClient();
  const {mutate: likeMutate} = usePostLike();
  const {mutate: dislikeMutate} = useDeleteLike(); 

  const isLiked = lpData?.likes.map((like)=>like.userId).includes(me?.data.id as number);


  const handleLikeLp = () => {
      likeMutate({lpId: Number(lpId)},
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["lpDetail", Number(lpId)] });
          },
        }
      );
  };

  const handleDislikeLp = () => {
    dislikeMutate({lpId: Number(lpId)},
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["lpDetail", Number(lpId)] });
        },
      }
  );
  }

  console.log(me);

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

  if (!accessToken) return null;

  // 🔽 로딩 중
  if (isLoading) return <div className="text-white p-6">불러오는 중...</div>;

  // 🔽 에러 발생 시
  if (isError || !lpData) {
    console.error("LP 상세 정보 요청 실패:", lpId);
    return <div className="text-red-500 p-6">LP 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="p-6 flex flex-col items-center text-white">

      <p className="text-sm text-zinc-400 mb-2">
      작성자 <span className="font-medium text-white">{lpData.author?.name ?? "알 수 없음"}</span>
      </p>      
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
      <div className="flex flex-wrap gap-2 mt-4 min-h-[1.5rem]">
        {lpData.tags && lpData.tags.length > 0 ? (
          lpData.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-zinc-700 rounded-full text-white text-sm"
            >
              #{tag.name}
            </span>
          ))
        ) : (
          <span className="text-sm text-zinc-400">{/* 태그 없음 */}</span>
        )}
      </div>

      {/* 버튼 UI만 */}
      <div className="flex space-x-4 mt-6">
        <button onClick={isLiked ? handleDislikeLp : handleLikeLp} className="text-sm text-pink-500 hover:underline"><Heart color="red" fill={isLiked ? "red": "transparent"}/><span>{lpData.likes.length}</span></button>
        <button className="text-sm text-pink-500 hover:underline">수정</button>
        <button className="text-sm text-pink-500 hover:underline">삭제</button>
      </div>

      {/* 댓글 목록 */}
      <CommentList />
    </div>
  );
};

export default LpDetailPage;
