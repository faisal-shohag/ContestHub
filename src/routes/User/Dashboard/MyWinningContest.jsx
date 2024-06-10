
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Crown, EditIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Description, Dialog, DialogPanel, DialogTitle,  } from '@headlessui/react'

const MyWinningContest = () => {
    const {user} = useAuth()
    const [contests, setContests] = useState([])
    const axiosSecure = useAxiosSecure()
    const [isOpen, setIsOpen] = useState(false)
    const [task, setTask] = useState(null)

    useEffect(() => {
         axiosSecure.get(`/participations/${user?.email}`)
         .then(res => {
             const c = res.data.data.filter(c => c.isWinner)
             setContests(c)
         })
    }, [user, axiosSecure])

    // console.log(contests)


    // const handleSortByDate = () => {
    //     contests.sort((a, b) => new Date(a.contestDetails.due) - new Date(b.contestDetails.due))
    //     setContests([...contests])
    //     console.log(contests);
    // }

    return (
        <div className="p-5">
         {contests && 
         <Card>
            <CardHeader>
            <CardTitle>My Winning Contests</CardTitle>
            <CardDescription>See your winning contest here.</CardDescription>
            
            {/* <Button onClick={handleSortByDate} className="w-[150px] mt-5 flex gap-2" variant="outline">
              <SortAsc size={20}/>  Sort by date
            </Button> */}
            
            </CardHeader>
            <CardContent>
          <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contest</TableHead>
            <TableHead>Prize</TableHead>
            {/* <TableHead className="hidden md:table-cell">Payment status</TableHead> */}
            <TableHead>
              <span className="">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contests.map((contest, index) => {
            return <TableRow key={index}>
                
              <TableCell className="font-medium flex items-center gap-2">{contest.isWinner && <Crown/> }{contest.contestDetails.name}</TableCell>
              <TableCell>
                ${contest.contestDetails.price_money}
              </TableCell>
              {/* <TableCell className="hidden md:table-cell"><Badge className="bg-green-600">Paid</Badge></TableCell> */}
              <TableCell>
                <div>
                  <div className="flex items-center gap-2">
                
                   <Button onClick={()=> {setIsOpen(true); setTask(contest)}} className="bg-green-600">
                      <EditIcon className="mr-2 h-4 w-4" />  See submission
                    </Button>
                  
                  </div>
                </div>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table></CardContent>

      
      </Card>
      
          
      }

      
      {
        task && <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed  inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg rounded-md shadow-2xl border bg-white p-8 dark:bg-gray-900 min-w-[500px]">
            <DialogTitle className="font-bold">Your submission({task.contestDetails.name})</DialogTitle>
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
      </Dialog>
      }
        </div>
    );
};

export default MyWinningContest;