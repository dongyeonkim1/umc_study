/* // src/components/CastList.tsx
import { Cast } from "../types/credit";
import defaultProfile from "../assets/no-image.png"; // 기본 이미지

type CastListProps = {
  cast: Cast[];
};

const CastList = ({ cast }: CastListProps) => {
  return (
    <section className="cast-crew-section">
      <h2 className="section-title">감독/출연</h2>
      <div className="cast-grid">
        {cast.slice(0, 12).map((actor) => (
          <div className="person-card" key={actor.id}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : defaultProfile
              }
              alt={actor.name}
              className="person-img"
            />
            <div className="person-name">{actor.name}</div>
            <div className="person-role">{actor.character}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CastList;
 */