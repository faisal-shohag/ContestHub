import ContestDetailsCard from "@/components/app_compnents/User/ContestDetailsCard";
import { Button } from "@/components/ui/button";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { MoveLeft, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ContestDetails = () => {
    const axiosSecure = useAxiosSecure()
    const params = useParams()
    const [contest, setContest] = useState(null)

    useEffect(()=> {
        axiosSecure.get(`/contests/${params.id}`)
        .then(res => {
            console.log(res.data.data)
            setContest(res.data.data)
        })
    }, [axiosSecure, params.id])


    


    return (
        <div className="section border shadow-xl mt-5 p-5 rounded-xl">
        <div className="flex border p-3 rounded-xl w-[100px] items-center gap-2 font-bold text-green-600"><MoveLeft/> Back</div>

         {
            contest &&
            <div className=" mt-5 flex justify-between gap-1">
               <div className="w-1/2 border-r pr-5">

               <div>
                <img className="rounded" src={contest.image} alt="contest-image" />
               </div>
                <div className="mt-5 text-2xl font-black">{contest.name}</div>
                <p>{contest.description}</p>
                <div className="mt-5 text-2xl font-black">Instructions</div>
                <p>{contest.instruction}</p>

                <div className='flex justify-center  mt-5'>
                 <Link className='w-full' to={`/contest-details/${contest._id}`}><Button className='btn w-full bg-green-600'> Register Now <MoveRight/></Button></Link>
                </div>
               </div>

               <div className="border-l pl-5 w-1/2">
                  
               </div>
            </div>
         }
     
     </div>
    );
};

export default ContestDetails;