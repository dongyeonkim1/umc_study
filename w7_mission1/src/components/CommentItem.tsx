import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCommentApi, deleteCommentApi } from "../apis/comment";
import { CommentData } from "../types/comment";


interface Props {
  comment: CommentData;
  isMine: boolean; // 본인 댓글 여부
}

const CommentItem = ({ comment, isMine }: Props) => {
  const { lpId } = useParams();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [menuOpen, setMenuOpen] = useState(false); // “...” 버튼 상태

  const { mutate: updateComment } = useMutation({
    mutationFn: updateCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
      setIsEditing(false);
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
  });

  const handleUpdate = () => {
    if (!editedContent.trim() || !lpId) return;
    updateComment({
      lpId: Number(lpId),
      commentId: comment.id,
      content: editedContent,
    });
  };

  const handleDelete = () => {
    if (window.confirm("댓글을 삭제할까요?") && lpId) {
      deleteComment({ lpId: Number(lpId), commentId: comment.id });
    }
  };

  return (
    <div className="flex items-start gap-2 w-full relative">
      {/* 아바타 */}
      <div className="w-8 h-8 rounded-full bg-pink-500 flex justify-center font-bold text-white items-center">
        {comment.author?.name?.[0] ?? "?"}
      </div>

      {/* 본문 */}
      <div className="flex flex-col items-start ml-2 w-full">
        <span className="font-semibold">{comment.author.name}</span>

        {isEditing ? (
          <>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full border p-1 rounded bg-zinc-800 text-white"
            />
            <div className="mt-1 space-x-2">
              <button onClick={handleUpdate} className="text-pink-400 text-sm">
                저장
              </button>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 text-sm">
                취소
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-300">{comment.content}</p>
            <span className="text-xs text-gray-500 mt-1">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </>
        )}
      </div>

      {/* “...” 버튼 및 드롭다운 메뉴 */}
      {isMine && !isEditing && (
        <div className="relative ml-auto text-sm">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-white px-2 py-1"
          >
            ...
          </button>

          {menuOpen && (
            <div className="absolute right-0 z-10 mt-1 bg-zinc-800 border border-zinc-700 rounded shadow-md flex gap-2 whitespace-nowrap">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setMenuOpen(false);
                }}
                className="px-4 py-2 w-full text-pink-500 hover:underline"
              >
                수정 
              </button>
              <button
                onClick={() => {
                  handleDelete();
                  setMenuOpen(false);
                }}
                className="px-4 py-2 w-full text-white hover:underline"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
