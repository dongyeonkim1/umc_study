import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogoutMutation = () => {
  const { setAccessToken, setRefreshToken } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => postLogout(),
    onSuccess: () => {
      // 로컬 저장소 및 상태 초기화
      setAccessToken(null);
      setRefreshToken(null);
      alert("로그아웃 되었습니다.");
      navigate("/");
    },
    onError: () => {
      // 강제 로그아웃 처리
      setAccessToken(null);
      setRefreshToken(null);
      alert("토큰이 만료되었거나 이미 로그아웃된 상태입니다.");
      navigate("/");
    },
  });
};
