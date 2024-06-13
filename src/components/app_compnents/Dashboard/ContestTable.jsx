
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
import {  Check, MessageSquareMore, MoreHorizontal, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";
import Loading from "../Common/Loding";
import useContest from "@/hooks/useContest";
import { Description, Dialog, DialogPanel, DialogTitle,  } from '@headlessui/react'
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ContestTable = () => {
  const [contests, setContests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [contestId, setId] = useState(null)
  const axiosSecure = useAxiosSecure()


  const commentRef = useRef()

  const {updateContest} = useContest()

  let [isOpen, setIsOpen] = useState(false)
  



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

  const handleApprove = async (id, status) => {
    console.log(id)
    await updateContest({contestId: id, updateData:{status: status}})
    fetchContests2(currentPage);
}

 
const handleComment = () => {
  console.log(commentRef.current.value)

  toast.promise(
    axiosSecure.post('/add-comment/'+contestId, {
      comment: commentRef.current.value
    }),
    {
      loading: 'Adding comment...',
      success: 'Comment added successfully!',
      error: 'Error adding comment',
    }
  )

  setIsOpen(false)
}

const handleDeleteContest = (id) => {
  Swal.fire({
    title: "Do you want delete the contest?",
    showCancelButton: true,
    confirmButtonText: "Delete",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      axiosSecure
        .delete(`/contest/${id}`)
        .then((res) => {
          console.log(res);
          Swal.fire("Contest deleted!", "", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};





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
                         
                         <DropdownMenuItem onClick={() =>{ setIsOpen(true); setId(contest._id)}}>Comment</DropdownMenuItem>
                         <DropdownMenuItem onClick={() => handleApprove(contest._id, 'approved')}>{contest.status == 'approved' ? "Decline" : "Confirm"}</DropdownMenuItem>
                         <DropdownMenuItem onClick={()=>handleDeleteContest(contest._id)}>Delete</DropdownMenuItem>
                         
                       </DropdownMenuContent>
                     </DropdownMenu>
                     </div>
                      <div className="hidden lg:block">
                        <div className="flex items-center gap-2">
                        <Button onClick={() =>{ setIsOpen(true); setId(contest._id)}} className=""><MessageSquareMore className="mr-2 h-4 w-4" /> Comment</Button>
                        <Button onClick={() => handleApprove(contest._id, contest.status == 'approved' ? "pending" : "approved")} variant="" className="bg-green-500"><Check className="mr-2 h-4 w-4" />{contest.status == 'approved' ? "Decline" : "Confirm"}</Button>
                        <Button onClick={()=>handleDeleteContest(contest._id)} variant="destructive" className=""><Trash className="mr-2 h-4 w-4" /> Delete</Button>
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


         <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed  inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg rounded-md shadow-2xl space-y-4 border bg-white p-8 dark:bg-gray-900 min-w-[500px]">
            <DialogTitle className="font-bold">Comment</DialogTitle>
            <Description></Description>
              <Textarea
              type="text"
              placeholder="Comment"
              ref={commentRef}
              />
            <div className="flex gap-4">
              <Button variant="destructive" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleComment}>Submit</Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
   </div>
    );
};

export default ContestTable;