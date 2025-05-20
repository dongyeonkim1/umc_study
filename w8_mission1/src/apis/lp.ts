import { ResponseMyInfoDto } from "../types/auth";
import { commonResponse, PaginationDto } from "../types/common";
import { RequestLpDto, ResponseLikeLpDto, ResponseLpDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";


export const getLpList = async (
    paginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
    const{data} = await axiosInstance.get('/v1/lps', {
        params: paginationDto,
    });

    return data;
};

export const getLpDetail = async({lpId}: RequestLpDto):Promise<ResponseLpDto> => {
    const {data} = await axiosInstance.get(`/v1/lps/${lpId}`);

    return data;
};

export const postLike = async({lpId}: RequestLpDto): Promise<ResponseLikeLpDto> => {
    const {data} = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

    return data;
}

export const deleteLike = async({lpId}: RequestLpDto): Promise<ResponseLikeLpDto> => {
    
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`, {
  });

    return data;
}

/* export interface PostLpBody {
  title: string;
  content: string;
  tags: string[];
  image?: File;
} */

export interface PostLpBody {
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
  published: boolean;
}

export interface MyLp {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  tags: {id:number; name:string}[];
  published: boolean;
}

export const postLp = async (body: PostLpBody): Promise<void> => {
  await axiosInstance.post("/v1/lps", body);
};


export const getMyLpList = async (id:number): Promise<MyLp[]> => {
  const { data } = await axiosInstance.get(`/v1/lps/user/${id}`, {
    params: {
      limit: 1000,
    },
  });
  return data.data.data;
};