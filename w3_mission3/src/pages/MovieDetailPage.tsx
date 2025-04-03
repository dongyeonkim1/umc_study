import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Movie } from "../types/movie"; // 타입 불러오기

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<Movie>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovie(data);
      } catch (error) {
        console.error("영화 정보 불러오기 실패:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) fetchMovie();
  }, [movieId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !movie) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="movie-detail p-8">
      <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
      <p className="text-gray-500 mb-2">{movie.tagline}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-[200px] rounded mb-4"
      />
      <p><strong>개봉일:</strong> {movie.release_date}</p>
      <p><strong>평점:</strong> {movie.vote_average}</p>
      <p><strong>장르:</strong> {movie.genres.map((g) => g.name).join(", ")}</p>
      <p className="mt-4">{movie.overview}</p>
    </div>
  );
};

export default MovieDetailPage;
