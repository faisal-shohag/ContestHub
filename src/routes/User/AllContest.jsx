import Loading from "@/components/app_compnents/Common/Loding";
import ContestCard from "@/components/app_compnents/User/ContestCard";
import useContest from "@/hooks/useContest";
import { MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const AllContest = () => {
  const navigate = useNavigate()
  const { contests } = useContest();
  const _contests = contests.data;
  const [data, setData] = useState(_contests);

  useEffect(() => {
    setData(_contests);
  }, [_contests]);

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
      title: "Digital Advertisement",
    },
    {
      tab: "game",
      title: "Gaming Review",
    },
    {
      tab: "business",
      title: "Business Idea Concerts",
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


  const [tabIndex, setTabIndex] = useState(0)
  const handleSelect = (index) => {
    setTabIndex(index)

    if(index == 0){
         setData(_contests)
         return
    }

    const tabData = _contests.filter((contest) => {
        return contest.type === tabs[index].title;
    });

    setData(tabData)
  
  } 

  return (
    <div className="section border shadow-xl mt-5 p-5 rounded-xl min-h-[500px]">
      <div onClick={()=>navigate('/')} className="flex cursor-pointer border p-3 rounded-xl w-[100px] items-center gap-2 font-bold text-green-600">
        <MoveLeft /> Back
      </div>
      <div className="mt-5 text-2xl font-black mb-5">All contests</div>

      <Tabs defaultIndex={tabIndex} onSelect={(index)=>handleSelect(index)}>
    <TabList>
      {tabs.map((tab, index) => (
        <Tab key={index}>{tab.title}</Tab>
      ))}
    </TabList>

    <TabPanel>
    </TabPanel>
    <TabPanel>
    </TabPanel>
    <TabPanel>
    </TabPanel>
    <TabPanel>
    </TabPanel>
    <TabPanel>
    </TabPanel>
    <TabPanel>
    </TabPanel>
    <TabPanel>
    </TabPanel>
    <TabPanel>
    </TabPanel>
    <TabPanel>
    </TabPanel>
  </Tabs>



      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-2 w-ful mt-3 relative ">
        {data ? 
          <>
          {data.length != 0 ? <>
            {data.map((contest) => (
              <ContestCard key={contest._id} contest={contest} />
            ))}
          </> : <div className="text-center text-2xl font-bold w-full absolute">No contest found in this category!</div>}
          </>
         : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default AllContest;
