import React from "react";
import { Crew } from "../types/credit";

type CrewListProps = {
  crew: Crew[];
};

const CrewList: React.FC<CrewListProps> = ({ crew }) => {
  return (
    <div className="crew-list">
      <h2 className="text-xl font-bold mb-4">🎬 제작진</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {crew.map((member) => (
          <div key={member.id} className="bg-white rounded-2xl shadow-md p-4 text-center">
            {member.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                alt={member.name}
                className="w-full h-52 object-cover rounded-lg mb-2"
              />
            ) : (
              <div className="w-full h-52 bg-gray-300 rounded-lg mb-2 flex items-center justify-center text-sm text-gray-500">
                No Image
              </div>
            )}
            <div className="font-semibold">{member.name}</div>
            <div className="text-sm text-gray-500">{member.job}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewList;
