/* import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch"
import { MovieDetailResponse } from "../types/movie";

const MovieDetailPage = () => {
  const params = useParams();
  const url = `https://api.themoviedb.org/3/movie/${params.movieId}`;


  const {isPending, isError, data: movie} = useCustomFetch<MovieDetailResponse>(url, 'ko-KR');

  

      if (isPending) {
        return <div>Loading...</div>
      }

  if(isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다</span>
      </div>
    );
  }

  console.log(params);
  return <div> (
    MovieDetailPage{params.movieId}
    {movie?.id}  
    {movie?.production_companies.map((company) => company.name)}
    {movie?.original_title}
    {movie?.overview}
  )
    </div>
};

export default MovieDetailPage;
 */


import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import { MovieDetailResponse } from "../types/movie";
import { CreditResponse } from "../types/credit";

const MovieDetailPage = () => {
  const params = useParams();
  const detailUrl = `https://api.themoviedb.org/3/movie/${params.movieId}`;
  const creditUrl = `https://api.themoviedb.org/3/movie/${params.movieId}/credits`;

  const { isPending, isError, data: movie } = useCustomFetch<MovieDetailResponse>(detailUrl, 'ko-KR');
  const { isPending: creditPending, isError: creditError, data: credit } = useCustomFetch<CreditResponse>(creditUrl, 'ko-KR');

  if (isPending || creditPending) return <div className="text-white h-screen flex items-center justify-center">Loading...</div>;
  if (isError || creditError) return <div className="text-red-500 text-2xl h-screen flex items-center justify-center">에러가 발생했습니다</div>;

  return (
    <div className="bg-black text-white w-full min-h-screen flex flex-col">
      
      {/* 배경 이미지 + 정보 */}
      <div className="relative w-full h-screen">
  {/* 배경 이미지 */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
    }}
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

  {/* 영화 정보  */}
  <div className="relative z-10 flex flex-col justify-end h-full px-10 pb-20 text-white">
    <h1 className="text-5xl font-bold mb-4">{movie?.original_title}</h1>
    <p className="text-sm text-gray-300 mb-2">
      ⭐ 평점 {movie?.vote_average} | {movie?.release_date?.slice(0, 4)} | {movie?.runtime}분
    </p>
    <p className="max-w-3xl text-lg leading-relaxed">{movie?.overview}</p>
  </div>
</div>


      {/*  출연/감독  */}
      <div className="w-full px-8 py-12">
        <h2 className="text-2xl font-semibold mb-8">감독 / 출연</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
          {credit?.cast.slice(0, 16).map((person) => (
            <div key={person.cast_id} className="text-center">
              <img
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                    : 'https://via.placeholder.com/200x300?text=No+Image'
                }
                alt={person.name}
                className="rounded-full w-24 h-24 object-cover mx-auto shadow-md"
              />
              <p className="mt-2 text-sm font-semibold">{person.name}</p>
              <p className="text-xs text-gray-400">{person.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
