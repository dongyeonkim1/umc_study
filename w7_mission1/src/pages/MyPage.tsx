import { useEffect, useRef, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getMyLpList } from "../apis/lp";
import LPModal from "../components/LpModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios";
import { uploadImage } from "../apis/uploads";
import { useDeleteLp } from "../hooks/mutations/useDeleteLp";
import { EditableLp } from "../types/lp";

interface UpdateProfileDto {
  name: string;
  bio?: string;
  avatar?: string;
}

const MyPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const [data, setData] = useState<any>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTargetLp, setEditTargetLp] = useState<EditableLp | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<UpdateProfileDto>({ name: "", bio: "", avatar: "" });

  const { mutate: deleteLpMutate } = useDeleteLp();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyInfo();
        setData(res.data);
        setUserId(res.data.id);
        setForm({ name: res.data.name, bio: res.data.bio ?? "", avatar: res.data.avatar ?? "" });
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
      }
    };
    fetchData();
  }, []);

  const { data: lpList = [] } = useQuery({
    queryKey: ["myLps"],
    queryFn: () => getMyLpList(userId!),
    enabled: !!userId,
  });

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (body: UpdateProfileDto) => axiosInstance.patch("/v1/users", body),
    onSuccess: () => {
      alert("프로필이 수정되었습니다.");
      setData((prev: any) => ({
        ...prev,
        name: form.name,
        bio: form.bio,
        avatar: form.avatar,
      }));
      setEditing(false);
    },
    onError: () => {
      alert("프로필 수정에 실패했습니다.");
    },
  });

  const handleSave = () => {
    if (!form.name.trim()) {
      alert("이름은 필수입니다.");
      return;
    }
    updateProfile(form);
  };

  const handleAvatarClick = () => {
    if (editing) fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const preview = URL.createObjectURL(file);
        setForm((prev) => ({ ...prev, avatar: preview }));
        const { imageUrl } = await uploadImage(file);
        setForm((prev) => ({ ...prev, avatar: imageUrl }));
      } catch (error) {
        console.error("이미지 업로드 실패", error);
        alert("이미지 업로드에 실패했습니다.");
      }
    }
  };

  return (
    <div className="text-white p-6">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">MyPage</h1>
        <div onClick={handleAvatarClick} className={`w-24 h-24 rounded-full overflow-hidden ${editing ? "cursor-pointer" : "cursor-not-allowed opacity-80"}`}>
          <img
            src={form.avatar?.startsWith("http") ? form.avatar : `${import.meta.env.VITE_SERVER_API_URL}${form.avatar}`}
            className="w-full h-full object-cover"
            alt="프로필 이미지"
          />
        </div>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" />

        {!editing ? (
          <div className="mt-6 text-sm text-center">
            <p className="mb-2"><strong>이름:</strong> {data?.name}</p>
            <p className="mb-2"><strong>이메일:</strong> {data?.email}</p>
            <p className="mb-4"><strong>소개:</strong> {data?.bio ?? "소개가 없습니다."}</p>
            <button onClick={() => setEditing(true)} className="bg-pink-500 px-4 py-2 rounded hover:bg-pink-600">수정</button>
          </div>
        ) : (
          <div className="mt-6 w-full max-w-xs text-sm">
            <div className="mb-4">
              <label className="font-semibold">이름</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full mt-1 p-2 rounded bg-zinc-800 border border-gray-500" />
            </div>
            <div className="mb-4">
              <label className="font-semibold">소개</label>
              <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full mt-1 p-2 rounded bg-zinc-800 border border-gray-500" />
            </div>
            <div className="flex gap-2">
              <button onClick={handleSave} disabled={isPending} className="bg-pink-500 px-4 py-2 rounded hover:bg-pink-600 w-full">{isPending ? "저장 중..." : "저장"}</button>
              <button onClick={() => setEditing(false)} className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 w-full">취소</button>
            </div>
          </div>
        )}
      </div>

      {(editTargetLp || isModalOpen) && (
        <LPModal
          initialData={editTargetLp || undefined}
          onClose={() => {
            setEditTargetLp(null);
            setIsModalOpen(false);
          }}
        />
      )}

      <div className="relative">
        <button onClick={() => setIsModalOpen(true)} className="fixed bottom-8 right-8 bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg text-lg">+</button>
      </div>

      <div className="mt-20">
        <h2 className="text-xl flex justify-center align-items-center font-semibold mb-18">내가 등록한 LP</h2>
        <div className="grid grid-cols-2 gap-4">
          {lpList.length === 0 ? (
            <p>등록한 LP가 없습니다.</p>
          ) : (
            lpList.map((lp) => (
              <div key={lp.id} onClick={() => setEditTargetLp({
                id: lp.id,
                title: lp.title,
                content: lp.content,
                thumbnail: lp.thumbnail,
                tags: lp.tags.map((tag) => tag.name),
              })} className="relative bg-zinc-700 rounded-lg p-4 h-60 flex flex-col items-center text-center cursor-pointer">
                <img src={lp.thumbnail} alt={lp.title} className="w-24 h-24 object-cover rounded-full mb-2 space-y-5" />
                <h2 className="text-lg font-semibold">{lp.title}</h2>
                <p className="text-sm mb-2 line-clamp-2">{lp.content}</p>
                <div className="flex justify-center flex-wrap gap-1 mt-2">
                  {lp.tags.map((tag) => (
                    <span key={tag.id} className="text-xs bg-pink-600 text-white px-2 py-1 rounded-full">#{tag.name}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;
