import Loading from "@/components/app_compnents/Common/Loding";
import DashboardCard from "@/components/app_compnents/Dashboard/DashboardCard";
import RecentSales from "@/components/app_compnents/Dashboard/RecentSales";
import Transactions from "@/components/app_compnents/Dashboard/Transactions";
import useAllContest from "@/hooks/useAllContest";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useUser from "@/hooks/useUser";
import { DollarSign, LucideUsers2, Palette, Target } from "lucide-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
   const {users} = useUser()
   const _users = users.data
   const creators = _users?.filter((user) => user.role === "creator")
   const {contests} = useAllContest() 
   const axiosSecure = useAxiosSecure()
   const [transactions, setTransactions] = useState([])
  const [income, setIncome] = useState(0)
   useEffect(() => {
    axiosSecure.get(`/participations`)
    .then(res => {
        setTransactions(res.data.data)
        let total = 0;
        for(const p of res.data.data){
            total += parseInt(p.contestDetails.price)
        }
        setIncome(total)  

    })
}, [axiosSecure])


   return (
        <div>
        <div className="rounded-xl pb-4 relative bg-no-repeat bg-right bg-contain ">
       {
        _users ?  <div className="lg:grid gap-2 grid md:grid-cols-2 lg:grid-cols-4  lg:justify-between grid-cols-1">
        <DashboardCard title="Total users" percent="34%" icon={<LucideUsers2 className="h-4 w-4 text-muted-foreground" />} num={_users?.length || 0} arrow="arrow_upward" cardimg="./card_graph.png"/>
        <DashboardCard title="Total Creators" percent="24%" icon={<Palette className="h-4 w-4 text-muted-foreground" />} num={creators?.length || 0} arrow="arrow_downward" cardimg="./card_down_graph.png"/>

        <DashboardCard title="Total contests" percent="24%" icon={<Target className="h-4 w-4 text-muted-foreground" />} num={contests.data?.length || 0} arrow="arrow_downward" cardimg="./card_down_graph.png"/>

        <DashboardCard title="Total Income" percent="24%" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} num={`$${income || 0}`} arrow="arrow_downward" cardimg="./card_down_graph.png"/>
      </div> : <Loading/> 
       }
      </div>

        <div className="grid gap-4 lg:grid-cols-2 grid-cols-1">
        {transactions && <Transactions transactions={transactions}/>}
        <RecentSales/>
        </div>
        </div>
    );
};

export default Dashboard;