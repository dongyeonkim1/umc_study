import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";

const HomePage = () => {
    const [search, setSearch] = useState("매튜"); 
    const {data, isPending, isError} = useGetLpList({
        search,
    });

    if(isPending) {
        return <div>Loading...</div>
    }

    if(isError) {
        return <div>Error.</div>
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center text-sm">
            <input value={search} onChange={(e)=>setSearch(e.target.value)} />
            {data?.map((lp) => <h1>{lp.title}</h1>)}
        </div>
    )

};

export default HomePage;