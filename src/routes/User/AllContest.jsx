import Loading from "@/components/app_compnents/Common/Loding";
import ContestCard from "@/components/app_compnents/User/ContestCard";
import useContest from "@/hooks/useContest";
import { MoveLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AllContest = () => {
  const { contests } = useContest();
  const _contests = contests.data;

  const tabs = [
    {
      tab: "all",
      title: "All",
    },
    {
      tab: "image",
      title: "Image Design",
    },
    {
      tab: "article",
      title: "Article Writing",
    },
    {
      tab: "marketing",
      title: "Marketing Strategy",
    },
    {
      tab: "adv",
      title: "Advertisement",
    },
    {
      tab: "game",
      title: "Gaming Review",
    },
    {
      tab: "business",
      title: "Business Idea",
    },
    {
      tab: "movie",
      title: "Movie Review",
    },
    {
      tab: "book",
      title: "Book Review",
    },
  ];
// #F1F5F9
// #1E293B
  return (
    <div className="section border shadow-xl mt-5 p-5 rounded-xl">
      <div className="flex border p-3 rounded-xl w-[100px] items-center gap-2 font-bold text-green-600">
        <MoveLeft /> Back
      </div>
      <div className="mt-5 text-2xl font-black">All contests</div>

      <div  className="bg-[#F1F5F9] p-2 rounded">
        <div className="flex w-full flex-wrap gap-2">
         {
            tabs.map((tab, indx)=> <div className="hover:bg-white cursor-pointer rounded px-2 py-1 hover:shadow-sm" key={indx} value={tab.tab}>{tab.title}</div>)
         }
        </div>


        <div value="all">
          Make changes to your account here.
        </div>
        <div value="password">Change your password here.</div>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-2 w-ful mt-3">
        {_contests ? (
          <>
            {_contests.map((contest) => (
              <ContestCard key={contest._id} contest={contest} />
            ))}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default AllContest;
