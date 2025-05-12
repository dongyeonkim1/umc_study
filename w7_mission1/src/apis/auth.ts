
import { RequestSigninDto, RequestSignupDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSignupDto } from "../types/auth";
import { axiosInstance } from "./axios";

export const postSignup = async (
    body: RequestSignupDto,
): Promise<ResponseSignupDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signup", body);

    return data;
};


export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);

  // 토큰 저장
  localStorage.setItem("accessToken", data.accessToken);

  // axios에 토큰 설정
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

  return data;
};


export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {

    const { data } = await axiosInstance.get("/v1/users/me");

    return data;
};


export const postLogout = async() => {
    const {data} = await axiosInstance.post('/v1/auth/signout');

    return data;
};