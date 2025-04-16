import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const {logout} = useAuth();

    const navigate = useNavigate();

    const [data, setData] = useState<ResponseMyInfoDto>([]);

    useEffect(() => {
         const getData = async () => {
            try {
                const response = await getMyInfo();
                console.log("유저 정보:", response); // 콘솔에도 확인
                setData(response);
              } catch (err) {
                console.error("유저 정보 불러오기 실패", err);
              }
        };

        getData();
    }, []);

    const handleLogout = async() => {
        await logout();
        navigate('/');
    }

    return (
        <div>
            <div className={"flex flex-col items-center h-dvh w-full mt-15 font-bold text-2xl"}>MyPage
                <div className=""><img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" className="w-28 h-28 rounded-full bg-white mt-10" alt="이미지" /></div>
                <div className={"text-sm font-light mt-15"}><h1 className="font-bold text-sm pb-3">이름</h1>{data.data?.name}</div>
                <div className={"text-sm font-light mt-10 pb-25"}><h1 className="font-bold text-sm pb-3">이메일</h1>{data.data?.email}</div>
                <button onClick={handleLogout} className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-gray-600">로그아웃</button>
           </div> 
        </div>
    );
};

export default MyPage;