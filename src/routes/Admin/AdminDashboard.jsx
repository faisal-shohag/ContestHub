import {
  Home,
  LogOut,
  Menu,
  Package2,
  Target,
  UserRoundCog,
} from "lucide-react"


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, NavLink, Outlet } from "react-router-dom"
import { RxDashboard } from "react-icons/rx";
import useAuth from "@/hooks/useAuth"

const AdminDashboard = () => {
    const {user, logOut } = useAuth()

    const handleLogOut = () => {
        logOut()
          .then()
          .catch((error) => console.log(error));
      };

  return (
    <div className="grid  w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="" className="flex items-center gap-2 font-semibold">
              <RxDashboard className="h-6 w-6" />
              <span className="">Admin Dashboard</span>
            </Link>
          </div>
          <div className="flex-1 dashboard">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink
                to="dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </NavLink>
              <NavLink
                to="manage-user"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
              >
                <UserRoundCog className="h-4 w-4" />
                Manage User
              </NavLink>
              <NavLink
                to="manage-contest"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all"
              >
                <Target className="h-4 w-4" />
                Manage Contests
              </NavLink>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        {/* Sheet */}
          <Sheet className="">
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="dashboard flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href=""
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="">Admin Dashboard</span>
                </Link>
                <NavLink
                to="dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </NavLink>
              <NavLink
                to="manage-user"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
              >
                <UserRoundCog className="h-4 w-4" />
                Manage User
              </NavLink>
              <NavLink
                to="manage-contest"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all"
              >
                <Target className="h-4 w-4" />
                Manage Contests
              </NavLink>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
{/* 
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div> */}
          <div className="w-full flex-1"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <img className="h-8 w-8" src={user?.photoURL} alt="profile-pic"/>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogOut}><LogOut className="mr-2" size={16}/> Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}


export default AdminDashboard