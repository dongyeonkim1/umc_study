// hooks/mutations/useSigninMutation.ts
import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";
import { RequestSigninDto } from "../../types/auth";
import { useAuth } from "../../context/AuthContext";

export const useSigninMutation = () => {
  const { setAccessToken, setRefreshToken } = useAuth();

  return useMutation({
    mutationFn: (body: RequestSigninDto) => postSignin(body),
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      alert("로그인 성공!");
      window.location.href = "/my";
    },
    onError: () => {
      alert("로그인 실패. 이메일 또는 비밀번호를 확인해주세요.");
    },
  });
};
