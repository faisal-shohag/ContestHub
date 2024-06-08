
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
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { dateFormate } from "@/lib/common";
import {  Check, EditIcon, MoreHorizontal, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Loading from "../Common/Loding";
import useContest from "@/hooks/useContest";

const ContestTable = () => {
  const [contests, setContests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const axiosSecure = useAxiosSecure()

  const {updateContest} = useContest()
  



  useEffect(() => {
    const fetchContests = async (page) => {
        try {
          const response = await axiosSecure.get(`/all_contests`, {
            params: { page: page }
          });
          setContests(response.data.data);
          setTotalPages(response.data.totalPages);
        } catch (error) {
          console.error('Error fetching contests:', error);
        }
      };
   fetchContests(currentPage);
  }, [currentPage, axiosSecure]);


  const fetchContests2 = async (page) => {
    try {
      const response = await axiosSecure.get(`/all_contests`, {
        params: { page: page }
      });
      setContests(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching contests:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleApprove = async (id) => {
    console.log(id)
    await updateContest({contestId: id, updateData:{status: "approved"}})
    fetchContests2(currentPage);
}



    return (
        <div className="p-4">
        <Card x-chunk="dashboard-06-chunk-0">
           <CardHeader>
             <CardTitle>All Contests</CardTitle>
             <CardDescription>
               Manage all contests here.
             </CardDescription>
           </CardHeader>
           <CardContent>
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead className="hidden w-[100px] sm:table-cell">
                     <span className="sr-only">img</span>
                   </TableHead>
                   <TableHead>Name</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead className="hidden md:table-cell">
                    Deadline
                   </TableHead>
                   <TableHead>
                     <span className="">Actions</span>
                   </TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>

                { contests ? contests.map((contest) => 
                <TableRow key={contest._id}>
                   <TableCell className="hidden sm:table-cell">
                     <img
                       alt="Contest img"
                       className="aspect-square rounded-md object-cover"
                       height="64"
                       src={contest.image}
                       width="64"
                     />
                   </TableCell>
                   <TableCell className="font-medium">
                     {contest.name}
                   </TableCell>
                   <TableCell>
                     <Badge variant="outline">{contest.status}</Badge>
                   </TableCell>
                   <TableCell className="hidden md:table-cell">
                     {dateFormate(contest.due)}
                   </TableCell>
                   <TableCell>
                     <div className="block lg:hidden">
                     <DropdownMenu>
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
                         <Link to={`/creator-dashboard/edit-contest/${contest._id}`}><DropdownMenuItem>Edit</DropdownMenuItem></Link>
                         <DropdownMenuItem onClick={() => handleApprove(contest._id)}>Approve</DropdownMenuItem>
                         <DropdownMenuItem>Delete</DropdownMenuItem>
                         
                       </DropdownMenuContent>
                     </DropdownMenu>
                     </div>
                      <div className="hidden lg:block">
                        <div className="flex items-center gap-2">
                        <Link to={`/creator-dashboard/edit-contest/${contest._id}`}><Button className=""><EditIcon className="mr-2 h-4 w-4" /> Edit</Button></Link>
                        <Button onClick={() => handleApprove(contest._id)} variant="" className="bg-green-500"><Check className="mr-2 h-4 w-4" /> Approve</Button>
                        <Button variant="destructive" className=""><Trash className="mr-2 h-4 w-4" /> Delete</Button>
                        </div>
                      </div>
                   </TableCell>
                 </TableRow> ) : <Loading/>
                }

               </TableBody>
             </Table>
           </CardContent>
           <CardFooter>
          
           <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
             
           </CardFooter>
         </Card>
   </div>
    );
};

export default ContestTable;