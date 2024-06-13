import usePopularContest from "@/hooks/usePopularContest";
import ContestCard from "./ContestCard";
import Loading from "../Common/Loding";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PopularContests = () => {
    const {contests} = usePopularContest()
    const _contests = contests.data

    return (
        <div className="border p-5 rounded-lg">
            <div className="font-bold text-2xl text-center">Popular Contests</div>

            <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-2 w-ful mt-3 relative ">
        {_contests ? 
          <>
          {_contests.length != 0 ? <>
            {_contests.map((contest) => (
              <ContestCard key={contest._id} contest={contest} />
            ))}
          </> : <div className="text-center text-2xl font-bold w-full absolute">No contest found in this category!</div>}
          </>
         : (
          <Loading />
        )}
      </div>

     <div className="flex justify-center">
    <Link to="/all_contest"> <Button className="mt-10 w-[200px]">Show All</Button></Link>
     </div>

        </div>
    );
};

export default PopularContests;