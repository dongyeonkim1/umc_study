import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";
import { RequestSigninDto } from "../../types/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useSigninMutation = () => {
  const { setAccessToken, setRefreshToken } = useAuth();
  const navigate = useNavigate(); // ✅ 추가

  return useMutation({
    mutationFn: (body: RequestSigninDto) => postSignin(body),
    onSuccess: (data) => {
      const { accessToken, refreshToken } = data.data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      alert("로그인 성공!");
      navigate("/my"); 
    },
    onError: () => {
      alert("로그인 실패. 이메일 또는 비밀번호를 확인해주세요.");
    },
  });
};
