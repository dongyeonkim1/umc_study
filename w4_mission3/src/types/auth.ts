import { commonResponse } from "./common";


//회원가입입
export type RequestSignupDto = {
    email: string;
    name: string;
    bio?: string;
    avatar?: string;
    password: string;
};

export type ResponseSignupDto = commonResponse<{
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;


//로그인

export type RequestSigninDto = {
    email: string;
    password: string;
};

export type ResponseSigninDto = commonResponse<{
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
}>;

//내정보 조회
export type ResponseMyInfoDto = commonResponse<{
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}>