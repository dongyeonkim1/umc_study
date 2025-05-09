import { PAGINATION_ORDER } from "../enums/common";

export type commonResponse<T> ={ 
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
};

/* export type CursorBasedResponse<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data: {
        data: T;
        nextCursor: number;
        hasNext: boolean;
    }
};
 */

export type CursorBasedResponse<T> = commonResponse<{
    data: T;
    nextCursor: number | null;
    hasNext: boolean;
}>;

export type PaginationDto = {
    cursor?: number;
    limit? : number;
    search?: string;
    order?: PAGINATION_ORDER;
};
