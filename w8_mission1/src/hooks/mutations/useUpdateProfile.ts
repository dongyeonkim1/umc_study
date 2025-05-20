import { useMutation } from "@tanstack/react-query";
import { patchProfile, UpdateProfileDto } from "../../apis/auth";

export const useUpdateProfile = () => {
 
  return useMutation({
    mutationFn: (body: UpdateProfileDto) => patchProfile(body),
    onSuccess: () => {
      alert("프로필이 수정되었습니다.");
      window.location.reload(); // 리렌더
    },
    onError: () => {
      alert("프로필 수정에 실패했습니다.");
    },
  });
};
