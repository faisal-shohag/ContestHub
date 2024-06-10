import Loading from "@/components/app_compnents/Common/Loding";
import DashboardCard from "@/components/app_compnents/Dashboard/DashboardCard";
import RecentSales from "@/components/app_compnents/Dashboard/RecentSales";
import Transactions from "@/components/app_compnents/Dashboard/Transactions";
import useAllContest from "@/hooks/useAllContest";
import useAuth from "@/hooks/useAuth";
import { CheckCircle, DollarSign, Hourglass, Target } from "lucide-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
   const {user} = useAuth()
   const {contests} = useAllContest()
   const [_contests, setContests] = useState() 
   const [completed, setCompleted] = useState()
   const [pending, setPending] = useState() 

   useEffect(() => {
    if(contests.data) {
        const c = contests.data.filter(contest => contest.creator_email == user?.email)
        setContests(c)
        const p = c?.filter((user) => user.status === "pending")
        setPending(p)
        const com = c?.filter((user) => user.status === "approved")
        setCompleted(com)
    }
   }, [user, contests])

    
   
    return (
        <div className="p-4">
        <div className="rounded-xl pb-4 relative bg-no-repeat bg-right bg-contain ">
       {
        _contests || contests ?  <div className="lg:grid gap-2 grid md:grid-cols-2 lg:grid-cols-4  lg:justify-between grid-cols-1">
        <DashboardCard title="Total contests"  icon={<Target className="h-4 w-4 text-muted-foreground" />} num={_contests?.length} arrow="arrow_upward" cardimg="./card_graph.png"/>
        <DashboardCard title="Approved"  icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />} num={completed?.length} arrow="arrow_downward" cardimg="./card_down_graph.png"/>

        <DashboardCard title="Pending"  icon={<Hourglass className="h-4 w-4 text-muted-foreground" />} num={pending?.length} arrow="arrow_downward" cardimg="./card_down_graph.png"/>

        <DashboardCard title="Total Income"  icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} num={`$${0}`} arrow="arrow_downward" cardimg="./card_down_graph.png"/>
      </div> : <Loading/> 
       }
      </div>

        <div className="grid gap-4 lg:grid-cols-2 grid-cols-1">
        {/* <Transactions/> */}
        <RecentSales/>
        </div>
        </div>
    );
};

export default Dashboard;