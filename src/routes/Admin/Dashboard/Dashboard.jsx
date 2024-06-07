import DashboardCard from "@/components/app_compnents/Dashboard/DashboardCard";
import RecentSales from "@/components/app_compnents/Dashboard/RecentSales";
import Transactions from "@/components/app_compnents/Dashboard/Transactions";
import { LucideUserCheck2, LucideUsers2, Palette, Target } from "lucide-react";

const Dashboard = () => {
    return (
        <div>
           <div className="rounded-xl pb-4 relative bg-no-repeat bg-right bg-contain ">
        <div className="lg:grid gap-2 grid md:grid-cols-2 lg:grid-cols-4  lg:justify-between grid-cols-1">
          <DashboardCard title="Total users" percent="34%" icon={<LucideUsers2 className="h-4 w-4 text-muted-foreground" />} num="67" arrow="arrow_upward" cardimg="./card_graph.png"/>
          <DashboardCard title="Active users" percent="24%" icon={<LucideUserCheck2 className="h-4 w-4 text-muted-foreground" />} num="6000" arrow="arrow_downward" cardimg="./card_down_graph.png"/>

          <DashboardCard title="Total contests" percent="24%" icon={<Target className="h-4 w-4 text-muted-foreground" />} num="17" arrow="arrow_downward" cardimg="./card_down_graph.png"/>

          <DashboardCard title="Total Creators" percent="24%" icon={<Palette className="h-4 w-4 text-muted-foreground" />} num="5" arrow="arrow_downward" cardimg="./card_down_graph.png"/>
        </div>
      </div>

        <div className="grid gap-4 lg:grid-cols-2 grid-cols-1">
        <Transactions/>
        <RecentSales/>
        </div>
        </div>
    );
};

export default Dashboard;