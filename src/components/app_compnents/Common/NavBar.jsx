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

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  //TODO: role based navigation
  const role = "creator";

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => console.log(error));
  };

  const handleNavigation = () => {
    if (role === "admin") {
      navigate("/admin-dashboard/dashboard");
    }
    if (role === "creator") {
      navigate("/creator-dashboard/dashboard");
    }

  };

  return (
    <div className="border p-3 flex gap-5 rounded-xl justify-between items-center">
      <div className=""><img className='h-8 w-8' src='https://i.postimg.cc/BbW5Mn5y/logo.png' alt='logo'/></div>

      <div className="flex items-center gap-5">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/all_contest">All Contest</NavLink>
      </div>
      <div className="flex gap-4">
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
