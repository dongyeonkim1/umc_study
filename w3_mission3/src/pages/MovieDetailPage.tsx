import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Movie } from "../types/movie";
import { Credits } from "../types/credit";
import CastList from "../components/CastList";
import CrewList from "../components/CrewList";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credit, setCredit] = useState<Credits | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        const [movieRes, creditRes] = await Promise.all([
          axios.get<Movie>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
          axios.get<Credits>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          ),
        ]);
        setMovie(movieRes.data);
        setCredit(creditRes.data);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) fetchMovie();
  }, [movieId]);

  if (isLoading) return <div className="p-6">로딩 중...</div>;
  if (isError || !movie || !credit) return <div className="p-6">에러가 발생했습니다.</div>;

  return (
    <div className="movie-detail p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-xl shadow-lg"
        />
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-500 text-lg">{movie.tagline}</p>
          <p><strong>개봉일:</strong> {movie.release_date}</p>
          <p><strong>평점:</strong> {movie.vote_average}</p>
          <p><strong>장르:</strong> {movie.genres.map((g) => g.name).join(", ")}</p>
          <p className="mt-2">{movie.overview}</p>
        </div>
      </div>

      <CastList cast={credit.cast} />
      <CrewList crew={credit.crew} />
    </div>
  );
};

export default MovieDetailPage;
