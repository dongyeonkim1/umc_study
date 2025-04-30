import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";


const HomePage = () => {

    const [search, setSearch] = useState(""); 
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const navigate = useNavigate();
   
    const {data, isPending, isError} = useGetLpList({
      search,
      order,
    });

    if(isPending) {
        return <div>Loading...</div>
    }

    if(isError) {
        return <div>Error.</div>
    }

    return (
        <div>
        
            <input value={search} onChange={(e)=>setSearch(e.target.value)} />
            {/* {data?.map((lp) => <h1>{lp.title}</h1>)} */}
            <div className="p-4">

                {/* 정렬 버튼 */}
                <div className="flex justify-end mb-4">
                    <button
                    onClick={() => setOrder("asc")}
                    className={`px-4 py-1 rounded ${
                        order === "asc" ? "bg-white text-black" : "bg-black-800 text-gray-300"
                    }`}
                    >
                    오래된순
                    </button>
                    <button
                    onClick={() => setOrder("desc")}
                    className={`px-4 py-1 rounded ${
                        order === "desc" ? "bg-white text-black" : "bg-black-800 text-gray-300"
                    }`}
                    >
                    최신순
                    </button>
                </div>
                {/* 
                <div className="grid grid-cols-5 gap-4">
                    {data?.map((lp) => (
                    <div
                        key={lp.id}
                        className="cursor-pointer"
                        onClick={() => navigate(`/lp/${lp.id}`)}
                    >
                        <img src={lp.thumbnail} alt={lp.title} className="w-full h-50 object-cover rounded transform transition-transform duration-300 hover:scale-110"/>
                     
                       

                       
                    </div>
                    ))}
                </div> */}
                <div className="grid grid-cols-5 space-x-2">
                {data?.map((lp) => (
                    <div
                        key={lp.id}
                        className="relative cursor-pointer transition-transform duration-300"
                        onMouseEnter={() => setHoveredId(lp.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => navigate(`/lp/${lp.id}`)}
                    >
                        <img
                        src={lp.thumbnail}
                        alt={lp.title}
                        className={`flex w-full h-60 object-cover rounded transition-transform duration-300 ${
                            hoveredId === lp.id ? "scale-110" : ""
                        }`}
                        />

                        {/* 오버레이 */}
                        {hoveredId === lp.id && (
                        <>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent hover:scale-110" />
                            <div className="absolute inset-0 flex flex-col items-start justify-end p-3 text-white">
                            <p className="font-bold text-sm mb-1">{lp.title}</p>
                            <p className="text-xs">{dayjs(lp.updatedAt).format("YYYY-MM-DD HH:mm")}</p>
                            <p className="text-xs mt-1">❤️ {lp.likes?.length ?? 0}</p>
                            </div>
                        </>
                        )}
                    </div>
                    ))}
                </div>

                </div>
        </div>
    )
    

};

export default HomePage;

 {/* <p className="mt-2 text-sm">{lp.title}</p>
                        <p className="text-xs text-gray-400">{lp.createdAt}</p>
                         */}