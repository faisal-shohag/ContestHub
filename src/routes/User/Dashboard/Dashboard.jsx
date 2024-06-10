import Loading from "@/components/app_compnents/Common/Loding";
import DashboardCard from "@/components/app_compnents/Dashboard/DashboardCard";
import Transactions from "@/components/app_compnents/Dashboard/Transactions";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Crown, DollarSign, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { FaMoneyBill } from "react-icons/fa";

const Dashboard = () => {
   const {user} = useAuth()
   const [contests, setContests] = useState([])
   const axiosSecure = useAxiosSecure()
   const [winCount, setWinCount] = useState(0)
   const [totalPaid, setTotalPaid] = useState(0)
   const [totalWin, setTotalWin] = useState(0)
   useEffect(() => {
        axiosSecure.get(`/participations/${user?.email}`)
        .then(res => {
            setContests(res.data.data)
            const w = res.data.data.filter(p => p.isWinner)
            setWinCount(w.length)
            let total = 0;
            for(const p of res.data.data){
                total += parseInt(p.contestDetails.price)
            }
            setTotalPaid(total)
            total = 0;
            for(const p of w){
                total += parseInt(p.contestDetails.price)
            }
            setTotalWin(total)
        })
   }, [user, axiosSecure])


    
   
    return (
        <div className="p-4">
             {
        contests ?  
        <>
        <div className="rounded-xl pb-4 relative bg-no-repeat bg-right bg-contain ">
      <div className="lg:grid gap-2 grid md:grid-cols-2 lg:grid-cols-4  lg:justify-between grid-cols-1">
        <DashboardCard title="Participated contests"  icon={<Target className="h-4 w-4 text-muted-foreground" />} num={contests?.length} arrow="arrow_upward" cardimg="./card_graph.png"/>
        <DashboardCard title="Winning contests"  icon={<Crown className="h-4 w-4 text-muted-foreground" />} num={winCount} arrow="arrow_downward" cardimg="./card_down_graph.png"/>

        <DashboardCard title="Total paid"  icon={<FaMoneyBill className="h-4 w-4 text-muted-foreground" />} num={`$${totalPaid}`} arrow="arrow_downward" cardimg="./card_down_graph.png"/>

        <DashboardCard title="Total win"  icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} num={`$${totalWin}`} arrow="arrow_downward" cardimg="./card_down_graph.png"/>
      </div> 
      </div>

        <div className="grid gap-4 lg:grid-cols-2 grid-cols-1">
        <Transactions transactions={contests}/>
        </div> </>: <Loading/> 
       }
        </div>
    );
};

export default Dashboard;