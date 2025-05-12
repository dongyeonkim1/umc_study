import { axiosInstance } from "./axios";
import { commonResponse } from "../types/common";
import { ResponseMyInfoDto } from "../types/auth";

export type RequestUpdateProfileDto = {
  name: string;
  bio?: string | null;
  avatar?: string | null;
};

export const updateMyProfile = async (
  body: RequestUpdateProfileDto
): Promise<commonResponse<ResponseMyInfoDto["data"]>> => {
  const res = await axiosInstance.patch("/v1/users/me", body);
  return res.data;
};
