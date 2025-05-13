// hooks/mutations/useDeleteLp.ts

import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";

export const useDeleteLp = () => {
  return useMutation({
    mutationFn: async (lpId: number) => {
      const response = await axiosInstance.delete(`/v1/lps/${lpId}`);
      return response.data;
    },
  });
};
