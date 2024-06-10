import Loading from "@/components/app_compnents/Common/Loding";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const Leaderboard = () => {
    const axiosPublic = useAxiosPublic()
    const [leaderboard, setLeaderboard] = useState([])
    const [top, setTop] = useState([])
    const [isLeaderBoard, setIsLeaderBoard] = useState(false);

    useEffect(()=> {
        axiosPublic.get('/leaderboard')
        .then(res =>{ 
            setTop(res.data.data.slice(0, 3));
            setLeaderboard(res.data.data.slice(3));
            setIsLeaderBoard(true);
        })
        .catch(err => console.log(err))
    }, [axiosPublic])


    return (
        <div className="m-10 p-10 shadow-2xl rounded-lg">
        <div>
          <div
            style={{
              backgroundImage: 'url("https://i.postimg.cc/HW2cmBHp/image.png")',
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            }}
            className="shadow-xl rounded-xl bg-no-repeat bg-cover p-5 font-bold text-2xl text-gray-200"
          >
            {/* <img className="h-[100px] rounded-xl" src="https://i.postimg.cc/BvWGrnWz/image.png" alt="leaderboard"/> */}
            Leaderboard(According to Win counts)
          </div>
        </div>
  
        {isLeaderBoard ? (
          <>
            <div className="flex justify-center mt-10 gap-5 items-baseline text-center">
              <div className="relative h-[100px]">
                <div className="text-xl absolute bottom-0 bg-gradient-to-r from-red-500  to-purple-500 text-white font-semibold  h-[50px] w-[50px] rounded-full flex justify-center items-center">
                  <div className="h-[50px] w-[50px] rounded-full flex items-center justify-center custom-glass flex-col">
                    <div className="font-bold text-sm">{top[1].totalWins}</div>
                  </div>
                </div>
                <img className="rounded-full h-[100px]" src={top[1].photoURL} />
                <div className="font-bold text-xl">{top[1].name}</div>
              </div>
  
  
              <div className="relative h-[150px]">
              <div className="text-xl absolute bottom-0 bg-gradient-to-r from-red-500  to-purple-500 text-white font-semibold  h-[50px] w-[50px] rounded-full flex justify-center items-center">
                  <div className="h-[50px] w-[50px] rounded-full flex items-center justify-center custom-glass flex-col">
                    <div className="font-bold text-sm">{top[0].totalWins}</div>
                  </div>
                </div>
                <img className="rounded-full h-[150px]" src={top[0].photoURL} />
                <div className="font-bold text-xl">{top[0].name}</div>
              </div>
  
  
              <div className="relative h-[100px]">
              <div className="text-xl absolute bottom-0 bg-gradient-to-r from-red-500  to-purple-500 text-white font-semibold  h-[50px] w-[50px] rounded-full flex justify-center items-center">
                  <div className="h-[50px] w-[50px] rounded-full flex items-center justify-center custom-glass flex-col">
                    <div className="font-bold text-sm">{top[2].totalWins}</div>
                  </div>
                </div>
                <img
                  className="rounded-full h-[100px] w-[100px]"
                  src={top[2].photoURL}
                />
                <div className="font-bold text-xl">{top[2].name}</div>
              </div>
            </div>
  
            <div className="grid grid-cols-1 gap-2 mt-5">
              {leaderboard.map((user, index) => (
                <div
                  key={index}
                  className=" shadow-lg items flex justify-between p-3 items-center rounded-xl border"
                >
                  <div className="flex items-center gap-2">
                    <img className="rounded-full h-[50px]" src={user.photoURL} />
                    <div>
                      <div className="font-bold">{user.name}</div>
                      {/* <div className="text-sm">
                        <span>Completed: </span>
                        <span>{user.assignmentCount}</span>
                      </div> */}
                    </div>
                  </div>
  
                  <div className="text-2xl">{user.totalWins}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <center className="mt-20">
            <Loading />
          </center>
        )}
      </div>
    );
};

export default Leaderboard;