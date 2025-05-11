import { useRef, useEffect, useState } from "react";
import { usePostLp } from "../hooks/mutations/usePostLp";
import { queryClient } from "../App";

interface LPModalProps {
  onClose: () => void;
}

const LPModal = ({ onClose }: LPModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [lpImage, setLpImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { mutate: postLpMutate } = usePostLp();

  // 모달 외부 클릭 시 닫기
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLpImage(e.target.files[0]);
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

    postLpMutate(
      {
        title,
        content,
        tags,
        thumbnail: lpImage
          ? URL.createObjectURL(lpImage)
          : "https://example.com/thumbnail.png", // 기본 썸네일 대체 URL
        published: true,
      },
      {
        onSuccess: () => {
          alert("LP가 성공적으로 등록되었습니다!");
          queryClient.invalidateQueries({ queryKey: ["myLps"] });
          onClose();
        },
        onError: (error) => {
          console.error("LP 등록 에러:", error);
          alert("LP 등록 중 오류가 발생했습니다.");
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-zinc-800 p-6 rounded-lg w-[400px] relative text-white"
      >
        <button className="absolute top-3 right-4" onClick={onClose}>
          ✕
        </button>

        {/* ✅ CD 모양 도형 */}
        <div className="flex justify-center mb-4">
          {lpImage ? (
            <img
              src={URL.createObjectURL(lpImage)}
              alt="preview"
              className="w-32 h-32 object-cover rounded-full"
              onClick={handleImageClick}
            />
          ) : (
            <div
              onClick={handleImageClick}
              className="w-32 h-32 bg-gradient-to-br from-zinc-700 to-zinc-600 rounded-full flex items-center justify-center cursor-pointer relative"
            >
              <div className="w-6 h-6 bg-black rounded-full z-10" />
              <div className="absolute text-xs text-white bottom-1">
                Click to Upload
              </div>
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

        {/* 제목 */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 px-3 py-2 rounded bg-zinc-700 text-white"
          placeholder="LP Name"
        />

        {/* 내용 */}
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-2 px-3 py-2 rounded bg-zinc-700 text-white"
          placeholder="LP Content"
        />

        {/* 태그 입력 및 추가 */}
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

        {/* 태그 목록 */}
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

        {/* LP 등록 버튼 */}
        <button
          className="mt-2 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded"
          onClick={handleSubmit}
        >
          Add LP
        </button>
      </div>
    </div>
  );
};

export default LPModal;
