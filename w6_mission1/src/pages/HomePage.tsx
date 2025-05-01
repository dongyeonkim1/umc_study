import { useEffect, useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {

    const [search, setSearch] = useState(""); 
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    /* const [order, setOrder] = useState<"asc" | "desc">("desc"); */
    const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);

    const navigate = useNavigate();
   
    /* const {data, isPending, isError} = useGetLpList({
      search,
      order,
      limit: 50,
    }); */

    const {data: lps, isFetching, hasNextPage,isPending, fetchNextPage, isError} = useGetInfiniteLpList(10, search, order);

    const {ref, inView} = useInView({
        threshold:0,
    });
    console.log(inView);

    useEffect(()=> {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage()
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    if(isPending) {
        return <div>Loading...</div>
    }

    if(isError) {
        return <div>Error.</div>
    }

    //page consolelog
    /* console.log(data);
    {data.pages.map((page) => 
        console.log(page.data.data.map((lp) => console.log(lp))),
    )} */

    {lps?.pages?.map((page) => console.log(page.data.data))}

    return (
        <div>
        
            <div className="mt-5 justify-center items-center">
                <input value={search} placeholder="search" onChange={(e)=>setSearch(e.target.value)} />
                
            </div>
            {/* <div ref={ref} className={'mt-8 flex justify-center bg-gray-400 h-2'}></div> */}

                {/* 정렬 버튼 */}
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

            <div className={"grid grid-cols-1 sm:gird-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
                {lps.pages
                    ?.map((page)=>page.data.data)
                    ?.flat()
                    ?.map((lp)=> <LpCard key={lp.id} lp={lp} />)} 
                    {isFetching && <LpCardSkeletonList count={20} />}
                        {/* <div 
                            key={lp.id}
                            className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                            >
                            <img
                            src={lp.thumbnail}
                            alt={lp.title}
                            className="object-cover w-full h-48"/>
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
                                <h3 className="text-sm font-semibold">{lp.title}</h3>
                            </div>
                        </div> */}
            </div>
            <div ref={ref} className="h-2"></div>
           

            {/* {data.pages.map((page) => 
                console.log(page.data.data.map((lp) => {lp.name})),
            )} */}
            {/* {data?.map((lp) => <h1>{lp.title}</h1>)} */}
            <div className="p-4">



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
                {/* <div className="grid grid-cols-5 space-x-2"> */}
            {/*     {data?.map((lp) => (
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
                        /> */}

                      
                 {/*        {hoveredId === lp.id && (
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
                    ))} */}
                {/* </div> */}

                </div>
        </div>
    )
    

};

export default HomePage;

 {/* <p className="mt-2 text-sm">{lp.title}</p>
                        <p className="text-xs text-gray-400">{lp.createdAt}</p>
                         */}