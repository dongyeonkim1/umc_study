import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";

const MyPage = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        // const getData = async () => {
        //     const response = await getMyInfo();
        //     console.log(response);
           

        //     setData(response.data.email);
        // };
         const getData = async () => {
            try {
                const response = await getMyInfo();
                console.log("유저 정보:", response); // 콘솔에도 확인
                setData(response.data);
              } catch (err) {
                console.error("유저 정보 불러오기 실패", err);
              }
        };

        getData();
    }, []);

    return (
        <div>
            <div className={"flex flex-col items-center h-dvh w-full mt-20 font-bold text-2xl"}>MyPage
                <div className={"text-sm font-light mt-15"}>{data.name}</div>
                <div className={"text-sm font-light mt-10"}>{data.email}</div>
            </div>
        </div>
    );
};

export default MyPage;