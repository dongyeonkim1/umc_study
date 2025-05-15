// ✅ 이미지 URL 입력도 지원하도록 LPModal 수정
import { useRef, useEffect, useState } from "react";
import { usePostLp } from "../hooks/mutations/usePostLp";
import { useUpdateLp } from "../hooks/mutations/useUpdateLp";
import { queryClient } from "../App";
import { EditableLp } from "../types/lp";
import { useDeleteLp } from "../hooks/mutations/useDeleteLp";
import { uploadImage } from "../apis/uploads";

interface LPModalProps {
  onClose: () => void;
  initialData?: EditableLp;
}

const LPModal = ({ onClose, initialData }: LPModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [lpImage, setLpImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

  const { mutate: postLpMutate } = usePostLp();
  const { mutate: updateLpMutate } = useUpdateLp();
  const { mutate: deleteLpMutate } = useDeleteLp();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setTags(initialData.tags);
      setThumbnailUrl(initialData.thumbnail);
    }
  }, [initialData]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleImageClick = () => {
    document.getElementById("lp-image-input")?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLpImage(file);
      const { imageUrl } = await uploadImage(file);
      setThumbnailUrl(imageUrl);
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const payload = {
      title,
      content,
      tags,
      thumbnail: thumbnailUrl || "https://example.com/default-thumbnail.jpg",
      published: true,
    };

    if (initialData) {
      updateLpMutate(
        { ...payload, id: initialData.id },
        {
          onSuccess: () => {
            alert("LP가 수정되었습니다!");
            queryClient.invalidateQueries({ queryKey: ["myLps"] });
            onClose();
          },
          onError: () => alert("수정 실패"),
        }
      );
    } else {
      postLpMutate(payload, {
        onSuccess: () => {
          alert("LP가 등록되었습니다!");
          queryClient.invalidateQueries({ queryKey: ["MyLps"] });
          queryClient.invalidateQueries({ queryKey: ["infiniteLps"] });
          
          onClose();
        },
        onError: () => alert("등록 실패"),
      });
    }
  };

  const handleDelete = () => {
    if (!initialData) return;
    const confirm = window.confirm("정말로 이 LP를 삭제하시겠습니까?");
    if (!confirm) return;

    deleteLpMutate(initialData.id, {
      onSuccess: () => {
        alert("LP가 삭제되었습니다.");
        queryClient.invalidateQueries({ queryKey: ["myLps"] });
        onClose();
      },
      onError: () => alert("삭제 실패"),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-zinc-800 p-6 rounded-lg w-[400px] relative text-white"
      >
        <button className="absolute top-3 right-4" onClick={onClose}>✕</button>

        <div className="flex justify-center mb-4">
          {lpImage ? (
            <img
              src={URL.createObjectURL(lpImage)}
              alt="preview"
              className="w-32 h-32 object-cover rounded-full"
              onClick={handleImageClick}
            />
          ) : thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt="existing"
              className="w-32 h-32 object-cover rounded-full"
              onClick={handleImageClick}
            />
          ) : (
            <div
              onClick={handleImageClick}
              className="w-32 h-32 bg-gradient-to-br from-zinc-700 to-zinc-600 rounded-full flex items-center justify-center cursor-pointer relative"
            >
              <div className="w-6 h-6 bg-black rounded-full z-10" />
              <div className="absolute text-xs text-white bottom-1">Click to Upload</div>
            </div>
          )}
          <input
            id="lp-image-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 px-3 py-2 rounded bg-zinc-700 text-white"
          placeholder="LP Name"
        />

        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-2 px-3 py-2 rounded bg-zinc-700 text-white"
          placeholder="LP Content"
        />

        {/* 이미지 주소 직접 입력란 */}
        <input
          type="text"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          className="w-full mb-2 px-3 py-2 rounded bg-zinc-700 text-white"
          placeholder="이미지 주소 직접 입력 (선택)"
        />

        <div className="flex mb-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            className="flex-grow px-3 py-2 rounded bg-zinc-700 text-white mr-2"
            placeholder="LP Tag"
          />
          <button
            onClick={handleAddTag}
            className="bg-pink-500 hover:bg-pink-600 px-4 rounded text-white"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <div
              key={tag}
              className="bg-zinc-600 px-2 py-1 rounded-full flex items-center text-sm"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 text-white hover:text-pink-300"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          className="mt-2 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded"
          onClick={handleSubmit}
        >
          {initialData ? "Update LP" : "Add LP"}
        </button>

        {initialData && (
          <button
            className="mt-2 w-full bg-zinc-600 hover:bg-zinc-700 text-white py-2 rounded"
            onClick={handleDelete}
          >
            Delete LP
          </button>
        )}
      </div>
    </div>
  );
};

export default LPModal;