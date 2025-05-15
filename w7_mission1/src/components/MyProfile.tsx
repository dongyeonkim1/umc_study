// ✅ MyProfile.tsx
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateMyProfile } from "../apis/user";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";

const MyProfile = () => {
  const queryClient = useQueryClient();

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
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["myInfo"] });
      const previous = queryClient.getQueryData<ResponseMyInfoDto>(["myInfo"]);
      queryClient.setQueryData(["myInfo"], (prev: any) => ({
        ...prev,
        data: {
          ...prev.data,
          name: newData.name,
          bio: newData.bio ?? null,
          avatar: newData.avatar ?? null,
        },
      }));
      return { previous };
    },
    onError: (err, _newData, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["myInfo"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["myInfo"] });
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
    setEditing(false);
  };

  if (!myInfo) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-4 mt-10 text-white">
      <img src={form.avatar || "/default-profile.png"} alt="avatar" className="w-28 h-28 rounded-full bg-gray-500 object-cover" />

      {editing ? (
        <>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-1 border rounded text-black" />
          <input value={form.bio ?? ""} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="px-3 py-1 border rounded text-black" />
          <input value={form.avatar ?? ""} onChange={(e) => setForm({ ...form, avatar: e.target.value })} className="px-3 py-1 border rounded text-black" />
          <button onClick={handleSave} className="text-green-400 text-xl">✔</button>
        </>
      ) : (
        <>
          <div className="border px-4 py-1 rounded">{myInfo.data.name}</div>
          <div className="border px-4 py-1 rounded">{myInfo.data.bio || " "}</div>
        </>
      )}

      <p>{myInfo.data.email}</p>

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
