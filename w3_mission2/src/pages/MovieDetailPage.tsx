import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
    const params = useParams();

    console.log(params);
    return <div className="movie-detail">movie detail🍿</div>
};

export default MovieDetailPage;