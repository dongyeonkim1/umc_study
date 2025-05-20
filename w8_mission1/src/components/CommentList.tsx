import { useEffect, useState } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { CommentData } from "../types/comment";
import { useParams } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useInView } from "react-intersection-observer";
import CommentSkeleton from "../components/CommentSkeleton";
import { postCommentApi } from "../apis/comment";
import CommentItem from "./CommentItem";
import { getMyInfo } from "../apis/auth";

const LIMIT = 5;

interface FlattenedCommentResponse {
  comments: CommentData[];
  nextCursor: number;
  hasNext: boolean;
}

const CommentList = () => {
  const { lpId } = useParams();
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [newComment, setNewComment] = useState("");

  const rawToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  const token = rawToken?.replace(/^"|"$/g, "");

  const queryClient = useQueryClient();

  // ✅ 현재 로그인한 유저 정보 가져오기
  const { data: myInfo } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    enabled: !!token,
  });

  const {
    data,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<FlattenedCommentResponse>({
    queryKey: ["comments", lpId, order],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axios.get(
        `http://localhost:8000/v1/lps/${lpId}/comments`,
        {
          params: {
            cursor: pageParam,
            limit: LIMIT,
            order,
          },
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        }
      );

      return {
        comments: res.data.data.data,
        nextCursor: res.data.data.nextCursor,
        hasNext: res.data.data.hasNext,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: !!lpId && !!token,
  });

  const { mutate: postComment, isPending } = useMutation({
    mutationFn: postCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lpId, order] });
      setNewComment("");
    },
    onError: () => {
      alert("댓글 작성 중 오류가 발생했습니다.");
    },
  });

  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div className="text-red-400 text-sm">댓글 불러오기 실패</div>;
  }

  return (
    <div className="mt-10 text-white">
      {/* 댓글 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl">댓글</div>
        <div className="flex gap-2">
          <button
            onClick={() => setOrder("asc")}
            className={`cursor-pointer px-4 py-2 rounded ${
              order === "asc" ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            오래된순
          </button>
          <button
            onClick={() => setOrder("desc")}
            className={`px-4 py-2 rounded ${
              order === "desc" ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            최신순
          </button>
        </div>
      </div>

      {/* 댓글 입력창 */}
      <div className="flex items-center gap-2 mb-10">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력해주세요"
          className="flex-1 px-3 py-2 rounded border border-gray-600 bg-[#1f1f1f] text-white focus:outline-none"
        />
        <button
          onClick={() => {
            if (!newComment.trim()) return alert("댓글을 입력해주세요");
            if (!lpId) return;
            postComment({ lpId: Number(lpId), content: newComment });
          }}
          disabled={isPending}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-[#212121] cursor-pointer disabled:opacity-50"
        >
          {isPending ? "작성 중..." : "작성"}
        </button>
      </div>

      {/* 댓글 리스트 */}
      <div className="space-y-4 w-full">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <CommentSkeleton key={i} />)
        ) : (
          data?.pages
            .flatMap((page) => page.comments)
            .map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                isMine={myInfo?.data.id === comment.authorId} 
              />
            ))
        )}

        {/* 무한 스크롤 하단 감지용 + 조건 스켈레톤 */}
        <div ref={ref} className="h-20">
          {hasNextPage && !isLoading && (
            <>
              {Array.from({ length: 2 }).map((_, i) => (
                <CommentSkeleton key={`fetching-${i}`} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentList;
