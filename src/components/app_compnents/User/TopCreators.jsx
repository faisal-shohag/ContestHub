import usePopularContest from "@/hooks/usePopularContest";
import Loading from "../Common/Loding";
import CreatorCard from "./CreatorCard";

const TopCreators = () => {
    const {contests} = usePopularContest()
    const _contests = contests.data?.slice(0, 3)

    return (
        <div style={{backgroundImage: "url('https://i.postimg.cc/c44Cwdqq/image.png')"}} className="border p-5 justify-center rounded-lg flex flex-col items-center w-full">
            <div className="font-bold text-2xl text-center text-white mb-14">Top Contest Creators</div>
            {_contests ? 
            <div className="grid lg:pl-[100px]  grid-cols-3 gap-2 w-full mt-5 relative ">
        
          <>
          {_contests.length != 0 ? <>
            {_contests.map((contest) => (
              <CreatorCard key={contest._id} contest={contest} />
            ))}
          </> : <div className="text-center text-2xl font-bold w-full absolute">No contest found in this category!</div>}
          </>
         
      </div>: (
          <Loading />
        )}

        </div>
    );
};


export default TopCreators;