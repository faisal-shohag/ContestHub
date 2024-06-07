
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {  MoreHorizontal, Palette, Trash, User } from "lucide-react";
import Loading from "../Common/Loding";
import { dateFormate } from "@/lib/common";
import useUser from "@/hooks/useUser";
import toast from "react-hot-toast";

const UsersTable = () => {
  const {users, refetch, updateUser } = useUser();
  let _users = users.data
  
  const handleUserRole = async (userId, role) => {
    role = role === "creator" ? "user" : "creator"
    let updateData = {role: role}
    console.log(role)
    try {
      await updateUser({ userId, updateData });
      console.log('User updated successfully');
      toast.success("User role changed!")
      refetch()
    } catch (error) {
      console.error('Failed to update user', error);
    }

  }

    return (
        <div>
             <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Manage Users</CardTitle>
                  <CardDescription>
                    Manage your users and view their roles.
                  </CardDescription>
                </CardHeader>
                {_users? <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">img</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead>
                          <span className="">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {_users.map((user) => <TableRow key={user._id}>
                        <TableCell className="hidden sm:table-cell">
                          <img
                            alt="user-image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={user.photoURL}
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                         {user.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                         {dateFormate(user.created_at)}
                        </TableCell>
                        <TableCell >
                          <div className="block lg:hidden">
                          <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleUserRole(user._id, user.role)} disabled={user.role === 'admin'}>Make {user.role==="user" ? "creator": "user"}</DropdownMenuItem>
                              <DropdownMenuItem disabled={user.role === 'admin'}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          </div>
                          <span className="hidden lg:block">
                          <div className="flex items-center gap-2">
                            <Button className="w-[150px]" onClick={() => handleUserRole(user._id, user.role)} disabled={user.role === 'admin'}>{user.role==="user" ? <Palette className="mr-2 h-4 w-4"/>: <User className="mr-2 h-4 w-4"/>} Make {user.role==="user" ? "creator": "user"}</Button>
                            <Button disabled={user.role === 'admin'} variant="destructive"><Trash className="mr-2 h-4 w-4"/> Delete</Button>
                          </div>
                          </span>
                        </TableCell>
                      </TableRow>)}
                    </TableBody>
                  </Table>
                </CardContent> : <Loading/>}
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
        </div>
    );
};



export default UsersTable;