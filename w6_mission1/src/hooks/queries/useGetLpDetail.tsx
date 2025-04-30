import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";

interface LpDetail {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  tags: { id: number; name: string }[];
  likes: { id: number; userId: number; lpId: number }[];
}

interface ResponseLpDetail {
  status: boolean;
  statusCode: number;
  message: string;
  data: LpDetail;
}

const getLpDetail = async (lpId: number): Promise<LpDetail> => {
  const res = await axiosInstance.get<ResponseLpDetail>(`/v1/lps/${lpId}`);
  return res.data.data;
};

const useGetLpDetail = (lpId: number) =>
  useQuery({
    queryKey: ["lpDetail", lpId],
    queryFn: () => getLpDetail(lpId),
    enabled: !!lpId,
    staleTime: 1000 * 60 * 5, // optional: 5분 캐싱
  });

export default useGetLpDetail;
