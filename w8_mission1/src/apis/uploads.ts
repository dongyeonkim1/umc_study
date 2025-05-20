// 📁 apis/upload.ts
import { axiosInstance } from "./axios";

interface UploadImageResponse {
  imageUrl: string;
}

export const uploadImage = async (file: File): Promise<UploadImageResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosInstance.post("/v1/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.data; 
};
