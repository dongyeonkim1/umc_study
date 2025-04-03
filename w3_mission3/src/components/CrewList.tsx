/* // src/components/CrewList.tsx
import { Crew } from "../types/credit";
import defaultProfile from "../assets/no-image.png";

type CrewListProps = {
  crew: Crew[];
};

const CrewList = ({ crew }: CrewListProps) => {
  const filteredCrew = crew.filter(
    (member) =>
      member.job === "Director" ||
      member.job === "Producer" ||
      member.job === "Screenplay"
  );

  return (
    <section className="cast-crew-section">
      <h2 className="section-title">제작진</h2>
      <div className="cast-grid">
        {filteredCrew.map((person) => (
          <div className="person-card" key={person.id}>
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                  : defaultProfile
              }
              alt={person.name}
              className="person-img"
            />
            <div className="person-name">{person.name}</div>
            <div className="person-role">{person.job}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CrewList;
 */