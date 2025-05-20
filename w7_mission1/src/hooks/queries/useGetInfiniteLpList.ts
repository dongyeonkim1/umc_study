import { useInfiniteQuery } from "@tanstack/react-query";
import { PAGINATION_ORDER } from "../../enums/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(
limit: number, search: string, order: PAGINATION_ORDER, searchType: "title" | "tag",
) {
    return useInfiniteQuery({
        queryFn:({pageParam}) => 
            getLpList({cursor: pageParam,limit, search, order, type: searchType}),
            queryKey: [QUERY_KEY.lps, search, order, searchType],
            initialPageParam: 0,
            getNextPageParam: (lastPage) => {
               /*  console.log(lastPage, allPages); */
                return lastPage.data.hasNext ? lastPage.data.nextCursor:undefined;
            },
    });
}

export default useGetInfiniteLpList;