
import { Crown, Home, LayoutDashboard, Target } from "lucide-react";
import { NavLink } from "react-router-dom";

const MobileNav = () => {
  

    return (
        <div id="mobilenav" className="custom-glass2 fixed bottom-1 left-0 w-full px-8 py-2 z-50 rounded-full flex items-center justify-between font-bold text-gray-600 h-[60px]">
            <NavLink to="/" className="flex flex-col items-center justify-center gap-0">
            <Home/>
            <div className="text-[12px]">Home</div>
            </NavLink>

            <NavLink to="/all_contest" className="flex flex-col items-center justify-center gap-0">
            <Target/>
            <div className="text-[12px]">Contests</div>
            </NavLink>

            <NavLink to="/leaderboard" className="flex flex-col items-center justify-center gap-0">
            <Crown/>
            <div className="text-[12px]">Rank</div>
            </NavLink>

            <NavLink to="/user-dashboard/dashboard" className="flex flex-col items-center justify-center gap-0">
            <LayoutDashboard/>
            <div className="text-[12px]">Dashboard</div>
            </NavLink>

        </div>
    );
};

export default MobileNav;