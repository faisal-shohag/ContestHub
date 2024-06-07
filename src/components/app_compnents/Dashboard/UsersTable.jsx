
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
import {  MoreHorizontal, Palette, Trash } from "lucide-react";
import PropTypes from "prop-types";
import Loading from "../Common/Loding";
import { dateFormate } from "@/lib/common";

const UsersTable = ({users}) => {



    return (
        <div>
             <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Manage Users</CardTitle>
                  <CardDescription>
                    Manage your users and view their roles.
                  </CardDescription>
                </CardHeader>
                {users? <CardContent>
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
                      {users.map((user) => <TableRow key={user._id}>
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
                        <TableCell>
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
                              <DropdownMenuItem>Make creator</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          </div>
                          <span className="hidden lg:block">
                          <div className="flex items-center gap-2">
                            <Button><Palette className="mr-2 h-4 w-4"/> Make creator</Button>
                            <Button variant="destructive"><Trash className="mr-2 h-4 w-4"/> Delete</Button>
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

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
}

export default UsersTable;