import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getMyLpList, MyLp } from "../apis/lp";
import LPModal from "../components/LpModal";

const MyPage = () => {
    const {logout} = useAuth();

    const navigate = useNavigate();

    const [data, setData] = useState<ResponseMyInfoDto>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const [lpList, setLpList] = useState<MyLp[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
     // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getMyInfo();
        setUserId(response.data.id);
      } catch (error) {
        console.error("유저 정보 불러오기 실패", error);
      }
    };

    fetchUserInfo();
  }, []);

  // LP 목록 가져오기
  useEffect(() => {
    const fetchMyLps = async () => {
      if (userId === null) return;
      try {
        const response = await getMyLpList(userId);
        setLpList(response);
      } catch (error) {
        console.error("내 LP 목록 불러오기 실패", error);
      }
    };

    fetchMyLps();
  }, [userId]);

    /* const handleLogout = async() => {
        await logout();
        navigate('/');
    }
 */
    return (
        <div>
            <div className="mt-10">
                <div className={"flex flex-col items-center h-dvh w-full mt-15 font-bold text-2xl"}>MyPage
                    <div className="w-28 h-28 rounded-full pt-10">
                        <img src={data.data?.avatar && data.data.avatar !== ""
                        ? data.data.avatar 
                        : "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                        className="w-28 h-28 rounded-full bg-white object-cover" alt="프로필 이미지" /></div>
                    <div className={"text-sm font-light mt-15"}><h1 className="font-bold text-sm pb-3 mt-10">이름</h1>{data.data?.name}</div>
                    <div className={"text-sm font-light mt-10 pb-25"}><h1 className="font-bold text-sm pb-3">이메일</h1>{data.data?.email}</div>
                    {/* <button onClick={handleLogout} className="w-full bg-zinc-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-gray-600">로그아웃</button> */}
                </div> 
            </div>
            <div className="p-6 text-white">
      {/* + 버튼 및 모달 */}
      <div className="relative">
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-8 bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg text-lg"
        >
          +
        </button>
        {isModalOpen && <LPModal onClose={() => setIsModalOpen(false)} />}
      </div>

      {/* 등록한 LP 목록 */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">내가 등록한 LP</h2>
        <div className="grid grid-cols-2 gap-4">
          {lpList.length === 0 ? (
            <p>등록한 LP가 없습니다.</p>
          ) : (
            lpList.map((lp) => (
              <div key={lp.id} className="bg-zinc-700 rounded p-4">
                <img
                  src={lp.thumbnail}
                  alt={lp.title}
                  className="w-full h-40 object-cover rounded-full mb-4 mx-auto"
                />
                <h2 className="text-lg font-semibold">{lp.title}</h2>
                <p className="text-sm mb-2">{lp.content}</p>
                <div className="flex flex-wrap gap-1">
                  {lp.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-xs bg-pink-600 text-white px-2 py-1 rounded-full"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
        </div>
    );
};

export default MyPage;