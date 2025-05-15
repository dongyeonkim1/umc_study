// src/components/CommentInput.tsx
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCommentApi } from "../apis/comment";
import { useParams } from "react-router-dom";

const CommentInput = () => {
  const { lpId } = useParams();
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const { mutate: postComment, isPending } = useMutation({
    mutationFn: postCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] }); // ✅ InfiniteQuery 재요청
      setContent(""); // ✅ textarea 비우기
    },
    onError: () => {
      alert("댓글 작성 중 오류가 발생했습니다.");
    },
  });

  const handleSubmit = () => {
    if (!content.trim()) return alert("댓글을 입력해주세요.");
    if (!lpId) return;

    postComment({ lpId: Number(lpId), content });
  };

  return (
    <div className="flex flex-col p-4 gap-2 border-b border-zinc-700">
      <textarea
        placeholder="댓글을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 rounded resize-none"
        rows={3}
      />
      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="self-end px-4 py-1 bg-pink-500 hover:bg-pink-600 text-white rounded"
      >
        {isPending ? "작성 중..." : "작성"}
      </button>
    </div>
  );
};

export default CommentInput;
