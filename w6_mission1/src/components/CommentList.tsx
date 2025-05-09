import { useParams } from "react-router-dom";
import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import axios from "axios";

interface Comment {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
}

interface CommentApiResponse {
  comments: Comment[];
  hasNext: boolean;
  nextCursor: number;
}

// 댓글 불러오기 함수
const fetchComments = async (
  context: QueryFunctionContext<[string, string, "asc" | "desc"]>
): Promise<CommentApiResponse> => {
  const { pageParam = 0, queryKey } = context;
  const [, lpId, order] = queryKey;

  const response = await axios.get(`/v1/lps/${lpId}/comments`, {
    params: {
      cursor: pageParam,
      limit: 10,
      order,
    },
  });

  return response.data.data;
};

const CommentList = () => {
  const { lpId } = useParams();
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["comments", lpId as string, order],
    queryFn: fetchComments,
    initialPageParam: 0,
    enabled: !!lpId,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="bg-black text-white p-4 space-y-4">
      {/* 정렬 버튼 & 댓글 작성창 */}
      <div className="flex justify-between justify-center items-center">
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          className="bg-zinc-800 text-white p-2 rounded-md  mr-2"
        />
        <button className="bg-pink-500 p-2 rounded-md hover:bg-pink-600 flex items-center justify-center">
          작성
        </button>
      </div>
      <div className="flex justify-end space-x-2 mt-2">
        <button
          onClick={() => setOrder("asc")}
          className={`px-2 py-1 rounded-md ${
            order === "asc" ? "bg-zinc-700" : "bg-zinc-800"
          }`}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder("desc")}
          className={`px-2 py-1 rounded-md ${
            order === "desc" ? "bg-zinc-700" : "bg-zinc-800"
          }`}
        >
          최신순
        </button>
      </div>

      {/* 댓글 목록 or 스켈레톤 */}
      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-zinc-800 h-16 rounded-md w-full"
            ></div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {data?.pages.flatMap((page) =>
            page.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-zinc-900 p-4 rounded-md shadow"
              >
                <p className="font-semibold text-pink-400">{comment.nickname}</p>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
            ))
          )}
          <div ref={ref} className="h-10" />
          {isFetchingNextPage && (
            <div className="text-center text-sm text-gray-400">불러오는 중...</div>
          )}
        </div>
      )}
      {isError && (
        <p className="text-red-400 text-sm">댓글을 불러오지 못했습니다.</p>
      )}
    </div>
  );
};

export default CommentList;
