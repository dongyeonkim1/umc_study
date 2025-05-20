import { useState } from "react";
import { Lp } from "../../types/lp";
import LpCardSkeleton from "./LpCardSkeleton";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface LpCardProps {
    lp: Lp
}

const LpCard = ({lp}: LpCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    return (
        <div>

            <div /* key={lp.id} */ className="cursor-pointer relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => navigate(`/lp/${lp.id}`)}
            >
                <img
                 src={lp.thumbnail || "/default-thumbnail.jpg"}
                 alt={lp.title}
                 className={`object-cover w-full h-55 transition-transform duration-300 ${
                    isHovered ? "scale-130 brightness-75" : ""
                  }`}
                />
                {isHovered && ( 
                    <div className="absolute inset-0 flex flex-col justify-end bg-black/40 text-white p-3">
                        <p className="text-sm font-bold">{lp.title}</p>
                        <p className="text-xs mt-1">{dayjs(lp.updatedAt).format("YYYY-MM-DD HH:mm")}</p>
                        <p className="text-xs mt-1">❤️ {lp.likes?.length ?? 0}</p>
                    </div>
                )}
                {/* <LpCardSkeleton /> */}
            </div>
        </div>
    );
};

export default LpCard;