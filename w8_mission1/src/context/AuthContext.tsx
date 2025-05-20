import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStrorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout } from "../apis/auth";
import { axiosInstance } from "../apis/axios"; 

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  setAccessToken: () => {},
  setRefreshToken: () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessTokenState] = useState<string | null>(
    getAccessTokenFromStorage()
  );
  const [refreshToken, setRefreshTokenState] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  const setAccessToken = (token: string | null) => {
    setAccessTokenInStorage(token);
    setAccessTokenState(token);
  };

  const setRefreshToken = (token: string | null) => {
    setRefreshTokenInStorage(token);
    setRefreshTokenState(token);
  };

  const logout = async () => {
    try {
      await postLogout(); // 서버에 로그아웃 요청
    } catch (error) {
      console.warn("로그아웃 실패 (무시 가능)", error);
    } finally {
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      setAccessToken(null);
      setRefreshToken(null);
    }
  };

  // ✅ accessToken이 변경될 때마다 axios에 자동 반영
  useEffect(() => {
    if (accessToken) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        setAccessToken,
        setRefreshToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다");
  }

  return context;
};
