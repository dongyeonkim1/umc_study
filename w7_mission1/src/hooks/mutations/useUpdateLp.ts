// hooks/mutations/useUpdateLp.ts

import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import { EditableLp } from "../../types/lp";

export const useUpdateLp = () => {
  return useMutation({
    mutationFn: async (lp: EditableLp) => {
      const { id, ...body } = lp;
      const response = await axiosInstance.patch(`/v1/lps/${id}`, body);
      return response.data;
    },
  });
};
