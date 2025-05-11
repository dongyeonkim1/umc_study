import { commonResponse, CursorBasedResponse } from "./common";

export type Tag = {
    id: number;
    name: string;
};

export type Likes = {
    id: number;
    userid: number;
    lpId: number;
};

export type Author = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Lp = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorid: number;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    likes: Likes[];
    author: Author;
}

export type RequestLpDto = {
    lpId: number;
};

export type ResponseLpDto = commonResponse<Lp>;

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type ResponseLikeLpDto = commonResponse<{
    id: number;
    userId: number;
    lpId: number;
}>;

