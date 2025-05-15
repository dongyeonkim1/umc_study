import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";

function usePostLike() {
    return useMutation({
        mutationFn: postLike,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, data.data.lpId],
                exact: true,
            });
        },
        onError:(error, context) => {},

        onMutate: (variables) => {
            console.log("hi");
        },

        onSettled:(data, error, variables, context) => {},
    });
}

export default usePostLike;