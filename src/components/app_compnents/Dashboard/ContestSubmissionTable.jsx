import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { dateFormate } from "@/lib/common";
import { Crown, EditIcon, Gift, MoreHorizontal} from "lucide-react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { Description, Dialog, DialogPanel, DialogTitle,  } from '@headlessui/react'
import { useState } from "react";

const ContestSubmissionTable = ({ submissions, update }) => {
  const axiosSecure = useAxiosSecure()
  const [task, setTask] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  
  


  const handleWinner = (id, status) => {
    toast.promise(
      axiosSecure.put(`/submission-update/${id}`, {isWinner: status})
      .then(() => {
        update()
      })
      ,
      {
        loading: "Declaring winner...",
        success: "Declared successfully!",
        error: "Error updating!",
      }
    );
  }

    return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="hidden md:table-cell">Submitted At</TableHead>

            <TableHead>
              <span className="">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => {
            return <TableRow key={submission.id}>
                
              <TableCell className="font-medium flex items-center gap-2">{submission.isWinner && <Crown/> }{submission.name}</TableCell>
              <TableCell>{submission.email}</TableCell>
              <TableCell className="hidden md:table-cell">
                {dateFormate(submission.paid_at)}
              </TableCell>
              <TableCell>
                <div className="block lg:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <>
                        <DropdownMenuItem onClick={()=> {setIsOpen(true); setTask(submission)}}>View Task</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=> handleWinner(submission.id, !submission.isWinner)}>{submission.isWinner ? "Remove Winner" : "Make Winner"}</DropdownMenuItem>
                      </>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="hidden lg:block">
                  <div className="flex items-center gap-2">
                    <Button onClick={()=> {setIsOpen(true); setTask(submission)}}>
                      <EditIcon className="mr-2 h-4 w-4" />  View Task
                    </Button>
                    <Button onClick={()=> handleWinner(submission.id, !submission.isWinner)}  variant="destructive" className="">
                      <Gift className="mr-2 h-4 w-4" /> {submission.isWinner ? "Remove Winner" : "Make Winner"}
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>

      {task && <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed  inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg rounded-md shadow-2xl border bg-white p-8 dark:bg-gray-900 min-w-[500px]">
            <DialogTitle className="font-bold">Task of <b>{task.name}</b></DialogTitle>
            <Description></Description>
          <>{ task.task ?
            <>
                <div className="font-bold mt-5">Task:</div>
                <div>Link: {task.task}</div>
                <div className="font-bold mt-5">Quick Note:</div>
                <div>{task.quickNote}</div>
            </> : <div>No task was provided!</div>
            }
            </>
            
            <div className="flex gap-4 mt-10">
              <Button variant="destructive" onClick={() => setIsOpen(false)}>OK</Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>}
    </div>
  );
};

ContestSubmissionTable.propTypes = {
  submissions: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
};

export default ContestSubmissionTable;
