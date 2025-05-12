import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyProfile } from "../apis/user";
import { getMyInfo } from "../apis/auth";
import { useQuery } from "@tanstack/react-query";
import { ResponseMyInfoDto } from "../types/auth";

const MyProfile = () => {
  const queryClient = useQueryClient();


  // 내 정보 가져오기
const { data: myInfo } = useQuery<ResponseMyInfoDto>({
  queryKey: ["myInfo"],
  queryFn: getMyInfo,
});

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: myInfo?.data.name || "",
    bio: myInfo?.data.bio || "",
    avatar: myInfo?.data.avatar || "",
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
      setEditing(false);
    },
  });

  const handleSave = () => {
    if (!form.name.trim()) {
      alert("이름은 필수 항목입니다.");
      return;
    }

    updateProfile({
      name: form.name,
      bio: form.bio || null,
      avatar: form.avatar || null,
    });
  };


  if (!myInfo) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-4 mt-10 text-white">
      {/* 프로필 이미지 */}
      <img
        src={form.avatar || "/default-profile.png"}
        alt="avatar"
        className="w-28 h-28 rounded-full bg-gray-500 object-cover"
      />

      {/* 이름, bio 입력 */}
      {editing ? (
        <>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-3 py-1 border rounded text-black"
          />
          <input
            value={form.bio ?? ""}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="px-3 py-1 border rounded text-black"
            placeholder="소개를 입력하세요"
          />
          <input
            value={form.avatar ?? ""}
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
            className="px-3 py-1 border rounded text-black"
            placeholder="프로필 이미지 URL"
          />
          <button onClick={handleSave} className="text-green-400 text-xl">✔</button>
        </>
      ) : (
        <>
          <div className="border px-4 py-1 rounded">{myInfo.data.name}</div>
          <div className="border px-4 py-1 rounded">{myInfo.data.bio || " "}</div>
        </>
      )}

      {/* 이메일 고정 */}
      <p>{myInfo.data.email}</p>

      {/* 설정 버튼 */}
      {!editing && (
         <button
            onClick={() => {
            setForm({
                name: myInfo.data.name,
                bio: myInfo.data.bio ?? "",
                avatar: myInfo.data.avatar ?? "",
            });
            setEditing(true);
       }}
    className="text-sm text-gray-300 underline"
  >
    설정
  </button>
)}
    </div>
  );
};

export default MyProfile;
