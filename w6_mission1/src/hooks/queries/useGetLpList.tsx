import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({cursor, search, order, limit}: PaginationDto) {
    return useQuery({
        queryKey:[QUERY_KEY.lps, search, order],
        queryFn: () => getLpList({
            cursor,
            search,
            order,
            limit,
        }),
        staleTime: 1000*60*5, //5min동안 기존 데이터 그대로 활용해서 네트워크 요청 감소
        gcTime: 100*60*10, //10min동안 사용되지 않으면, 해당 캐시 데이터 삭제<-gcTime 지난 후 제거(garbage collection)

        /* enabled: Boolean(search), */
        /* refetchInterval: 100*60, */

        select: (data) => data.data.data,
    });
}

export default useGetLpList;