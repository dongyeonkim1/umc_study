
import { useMutation } from "@tanstack/react-query";
import { postLp, PostLpBody } from "../../apis/lp";

export const usePostLp = () => {
  return useMutation({
    mutationFn: (body: PostLpBody) => postLp(body),
  });
};
