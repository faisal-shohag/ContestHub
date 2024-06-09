import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { dateFormate } from "@/lib/common";
import { Check, DollarSign, Gift, MoveLeft, MoveRight, Timer, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTimer } from "react-timer-hook";

const ContestDetails = () => {
    const axiosSecure = useAxiosSecure()
    const params = useParams()
    const [contest, setContest] = useState(null)
    const [participants, setParticipants] = useState([])
    const [registered, setRegistered] = useState(false)
    const {user} = useAuth()
    
    const [expire, setExpire] = useState(false);
    const expiryTimestamp = new Date(params.time);
    const { seconds, minutes, hours, days } = useTimer({
      expiryTimestamp,
      onExpire: () => setExpire(true),
    });
    


    useEffect(()=> {
        axiosSecure.get(`/contests/${params.id}`)
        .then(res => {
            setContest(res.data.data)
            setParticipants(res.data.data.participantDetails)
            const me = res.data.data.participantDetails.find(p => p.email === user?.email)
            me ? setRegistered(true) : setRegistered(false)

        })
    }, [axiosSecure, params.id, user?.email])

  

  


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
               <DropdownMenuSeparator className="mt-2"/>
                <div className="flex mt-2 items-center gap-3 flex-wrap">
                  <div className="text-center border h-[60px]  px-3 rounded-xl flex flex-col justify-center items-center">
                    <div className="font-bold font-poppins text-xl flex items-center gap-2"><DollarSign size={16}/> {contest.price}</div>
                    <div className="text-sm">Price</div>
                  </div>

                  <div className="text-center border h-[60px]  rounded-xl px-3 flex flex-col justify-center items-center">
                    <div className="font-bold font-poppins text-xl flex items-center gap-2"><Users size={16}/> {participants.length}</div>
                    <div className="text-sm">Participants</div>
                  </div>


                  <div className="text-center border h-[60px] px-3  rounded-xl flex flex-col justify-center items-center">
                    <div className="font-bold font-poppins text-xl flex items-center gap-2"><Gift size={16}/>{contest.price_money}</div>
                    <div className="text-sm">Prize</div>
                  </div>

                  <div className="text-center border h-[60px] px-3  rounded-xl flex flex-col justify-center items-center">
                    <div className="font-bold font-poppins text-sm flex items-center gap-2"><Timer size={18}/> {dateFormate(contest.due)}</div>
                   
                  </div>
                </div>

                <DropdownMenuSeparator className="mt-2"/>

                <div className="mt-3 text-2xl font-black">{contest.name}</div>
                <p>{contest.description}</p>
                <div className="mt-5 text-2xl font-black">Instructions</div>
                <p>{contest.instruction}</p>

             
           
                {
                  registered ? <Button  className='mt-5 btn w-full bg-green-400'> <Check/> Registered </Button>:
                   <div className='flex justify-center  mt-5'>
                   {!expire && <Link className='w-full' to={`/payment/${contest._id}`}><Button className='btn w-full bg-green-600'> Register Now <MoveRight/></Button></Link>}
                   {expire && <Button disabled className='btn w-full bg-green-600'> Register Now <MoveRight/></Button>}
                  </div>
                }
               

               </div>

               <div className="border-l pl-5 w-1/2">
                     {/* expiry timer */}
                {!expire ? (
                <div style={{backgroundImage: "url('https://i.postimg.cc/HW2cmBHp/image.png')"}} className="py-5 rounded-xl ">
                   {/* <center><img className="max-w-[250px]" src="https://i.postimg.cc/X7d4kD6S/image.png"/></center>
                 */}
                  <div className="text-2xl text-center font-bold mb-3 text-white">
                   {!registered ? "Registration Open" : "Remaining"}
                  </div>
                  <div className="flex text-3xl justify-center gap-1 mt-0 text-white">
                    {
                      <div className="flex flex-col items-center border px-3 py-2 rounded-xl w-[80px]">
                        <div>{days.toString().padStart(2, "0")}</div>
                        <div className="text-sm">day</div>
                      </div>
                    }
                    {
                      <div className="flex flex-col items-center border px-3 py-2 rounded-xl w-[80px]">
                        <div>{hours.toString().padStart(2, "0")}</div>
                        <div className="text-sm">hour</div>
                      </div>
                    }
                    {
                      <div className="flex flex-col items-center border px-3 py-2 rounded-xl w-[80px]">
                        <div>{minutes.toString().padStart(2, "0")}</div>
                        <div className="text-sm">minute</div>
                      </div>
                    }
                    {
                      <div className="flex flex-col items-center border px-3 py-2 rounded-xl w-[80px]">
                        <div>{seconds.toString().padStart(2, "0")}</div>
                        <div className="text-sm">second</div>
                      </div>
                    }
                  </div>
                </div>
              ) : (
                <div className="text-center py-1 font-semibold flex flex-col items-center">
                  <div>
                    <img className="max-h-[300px]" src="https://i.postimg.cc/5yv0d7hv/image.png"/>
                  </div>
                  <div className="">Not available. <br/></div>
                </div>
              )}
               </div>
            </div>
         }
     
     </div>
    );
};

export default ContestDetails;