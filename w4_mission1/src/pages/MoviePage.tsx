import { useState } from "react"
import { MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";


export default function MoviePage() { 
    
    //페이지처리
    const [page, setPage] = useState(1);
    //동적페이지
    const { category } = useParams<{
      category: string;
    }>();
    //url
   const url = `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`;

    const {data: movies, isPending, isError} = useCustomFetch<MovieResponse>(url, 'ko-KR');
  
    console.log(movies);

    if (isError) {
      return (
      <div>
        <span className="error-text">Error🔥</span>
      </div>
      );
    }

    return (
      <>
        <div className="flex items-center justify-center gap-6 mt-5">
          <button 
            className="bg-[#000000] text-white px-6 py-3 rounded-lg shadow-md
            hover:bg-[#000000] transition-all duration-200 disabled:bg-gray-300
            cursor-pointer disabled:cursor-not-allowed"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >{`<`}</button>
          <span className="page_text">PAGE {page}</span>
          <button 
            className="bg-[#000000] text-white px-6 py-3 rounded-lg shadow-md
            hover:bg-[#000000] transition-all duration-200 disabled: bg-transparent
            cursor-pointer"
            onClick={() => setPage((prev) => prev + 1)}
          >{`>`}</button>
        </div>
        { isPending && (
          <div className="flex items-center justify-center h-dvh">
            <LoadingSpinner />
          </div>
        )}

        { !isPending && (
          <div className="p-10 grid gap-4 grid-cols-2 sm:gird-cols-3 md:grid-cols-4
          lg:grid-cols-5 xl:grid-cols-6">
            {movies?.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie}/>
          ))}
          </div>
        )}
      </>
    );
}