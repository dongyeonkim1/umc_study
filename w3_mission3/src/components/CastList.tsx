import React from "react";
import { Cast } from "../types/credit";

type CastListProps = {
  cast: Cast[];
};

const CastList: React.FC<CastListProps> = ({ cast }) => {
  return (
    <div className="cast-list">
      <h2 className="cast_list">🎬출연진</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cast.map((actor) => (
          <div key={actor.id} className="bg-white rounded-2xl shadow-md p-4 text-center">
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                alt={actor.name}
                className="w-full h-52 object-cover rounded-lg mb-2"
              />
            ) : (
              <div className="w-full h-52 bg-gray-300 rounded-lg mb-2 flex items-center justify-center text-sm text-gray-500">
                No Image
              </div>
            )}
            <div className="font-semibold">{actor.name}</div>
            <div className="text-sm text-gray-500">{actor.character}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastList;
