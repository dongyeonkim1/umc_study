import { useState, useEffect } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import LPModal from "../components/LpModal"; 
import { useQueryClient } from "@tanstack/react-query";
import useDebounce from "../hooks/queries/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const [searchType, setSearchType] = useState<"title" | "tag">("title");


  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const queryClient = useQueryClient();

  const { data: lps, isFetching, hasNextPage, isPending, fetchNextPage, isError } =
    useGetInfiniteLpList(10, debouncedValue, order, searchType);

  const { ref, inView } = useInView({ threshold: 0 });

   const handleCloseModal = () => {
    setIsModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ['infiniteLps'] }); //  LP 목록 갱신
  };


  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending || !lps) return <div>Loading...</div>;
  if (isError) return <div>Error.</div>;

  const lpList = lps.pages?.flatMap((page) => page.data.data);
  console.log("🔥 LP 목록:", lpList); // ← 여기서 확인!

  return (
    <div className="text-white p-6">
      {/* 검색 및 정렬 */}
      <div className="mt-5 justify-center items-center">
        <input
          value={search}
          placeholder="search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-4 my-4">
        <label>
          <input
            type="radio"
            value="title"
            checked={searchType === "title"}
            onChange={() => setSearchType("title")}
          />
          제목
        </label>
        <label>
          <input
            type="radio"
            value="tag"
            checked={searchType === "tag"}
            onChange={() => setSearchType("tag")}
          />
          태그
        </label>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
          className={`px-4 py-1 rounded ${
            order === "asc" ? "bg-white text-black" : "bg-black-800 text-gray-300"
          }`}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
          className={`px-4 py-1 rounded ${
            order === "desc" ? "bg-white text-black" : "bg-black-800 text-gray-300"
          }`}
        >
          최신순
        </button>
      </div>

      {/* LP 카드 목록 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
        {lps.pages
          ?.flatMap((page) => page.data.data)
          .map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>

      <div ref={ref} className="h-2" />

      {/* LP Modal */}
      {isModalOpen && (
        <LPModal
          onClose={handleCloseModal}
        />
      )}

      {/* + 버튼 */}
      <div className="relative">
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-8 bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg text-lg"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default HomePage;