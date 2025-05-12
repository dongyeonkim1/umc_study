// src/apis/comment.ts
import { axiosInstance } from "./axios";
import { CommentData } from "../types/comment";

export const postCommentApi = async ({
  lpId,
  content,
}: {
  lpId: number;
  content: string;
}): Promise<CommentData> => {
  const res = await axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });
  return res.data.data; // 단일 CommentData 객체
};

// 댓글 수정
export const updateCommentApi = async ({
  lpId,
  commentId,
  content,
}: {
  lpId: number;
  commentId: number;
  content: string;
}) => {
  const res = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, {
    content,
  });
  return res.data;
};

// 댓글 삭제
export const deleteCommentApi = async ({
  lpId,
  commentId,
}: {
  lpId: number;
  commentId: number;
}) => {
  const res = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
  return res.data;
};