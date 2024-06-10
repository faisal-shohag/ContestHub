import { useNavigate } from 'react-router-dom';
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ModeToggle } from "../Theme/ToggleTheme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOutIcon } from "lucide-react";
import useAxiosSecure from '@/hooks/useAxiosSecure';

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();



  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => console.log(error));
  };

  const axiosSecure = useAxiosSecure()

  const handleNavigation = () => {
    axiosSecure.get('/user/' + user.email)
    .then(res => {
      navigate(`/${res.data.data.role}-dashboard/dashboard`);
    }) 
  };

  return (
    <div className="border Nav p-3 shadow-lg flex gap-5 lg:px-[100px]  justify-between items-center">
      <div className="animate-pulse"><img className='h-8 w-8' src='https://i.postimg.cc/XYSGZD9T/logo.png' alt='logo'/></div>

      <div className="flex items-center gap-10">
        <NavLink to="/"><span>Home</span></NavLink>
        <NavLink to="/all_contest"><span>All contests</span></NavLink>
        <NavLink to="/leaderboard"><span>Leaderboard</span></NavLink>
      </div>
      <div className="flex gap-4 items-center">
        {!user ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div>
                  <img className="w-8 h-8 rounded-full" src={user.photoURL} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleNavigation}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={handleLogOut}
                >
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}

        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
