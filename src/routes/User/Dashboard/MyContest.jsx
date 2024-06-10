import { Badge } from "@/components/ui/badge";
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
import { dateFormate } from "@/lib/common";
import { Crown, EditIcon, SortAsc } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyContest = () => {
    const {user} = useAuth()
    const [contests, setContests] = useState([])
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
         axiosSecure.get(`/participations/${user?.email}`)
         .then(res => {
             setContests(res.data.data)
         })
    }, [user, axiosSecure])


    const handleSortByDate = () => {
        contests.sort((a, b) => new Date(a.contestDetails.due) - new Date(b.contestDetails.due))
        setContests([...contests])
        console.log(contests);
    }

    return (
        <div className="p-5">
         {contests && 
         <Card>
            <CardHeader>
            <CardTitle>My Submitted contests</CardTitle>
            <CardDescription>Manage your own submitted contest here.</CardDescription>
            
            <Button onClick={handleSortByDate} className="w-[150px] mt-5 flex gap-2" variant="outline">
              <SortAsc size={20}/>  Sort by date
            </Button>
            
            </CardHeader>
            <CardContent>
          <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contest</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead className="hidden md:table-cell">Payment status</TableHead>
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
                {dateFormate(contest.contestDetails.due)}
              </TableCell>
              <TableCell className="hidden md:table-cell"><Badge className="bg-green-600">Paid</Badge></TableCell>
              <TableCell>
                <div>
                  <div className="flex items-center gap-2">
                   <Link to={`/contest-details/${contest.contestDetails._id}/${contest.contestDetails.due}`}>
                   <Button className="bg-green-600">
                      <EditIcon className="mr-2 h-4 w-4" />  Submit task
                    </Button>
                   </Link>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table></CardContent></Card>}
        </div>
    );
};

export default MyContest;