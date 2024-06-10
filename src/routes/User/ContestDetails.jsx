import { Button } from "@/components/ui/button";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { dateFormate } from "@/lib/common";
import { CheckCircle, DollarSign, Gift, MoveLeft, MoveRight, Timer, Users } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTimer } from "react-timer-hook";
import Confetti from 'react-confetti'

const ContestDetails = () => {
    const axiosSecure = useAxiosSecure()
    const params = useParams()
    const navigate = useNavigate()

    const [contest, setContest] = useState(null)
    const [participants, setParticipants] = useState([])
    const [self, setSelf] = useState(null)
    const [registered, setRegistered] = useState(false)
    const [winner, setWinner] = useState(null)
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
            console.log(res.data.data)
            setParticipants(res.data.data.participations)
            const me = res.data.data.participations.find(p => p.email === user?.email)
            setSelf(me)
            const w = res.data.data.participations.find(p => p.isWinner)
            setWinner(w)
            me ? setRegistered(true) : setRegistered(false)

        })
    }, [axiosSecure, params.id, user?.email])

  
    const update = () => {
      axiosSecure.get(`/contests/${params.id}`)
        .then(res => {
            setContest(res.data.data)
            setParticipants(res.data.data.participations)
            const me = res.data.data.participations.find(p => p.email === user?.email)
            setSelf(me)
            const w = res.data.data.participations.find(p => p.isWinner)
            setWinner(w)
            me ? setRegistered(true) : setRegistered(false)

        })
    }


    const handleSubmitTask = (event) => {
        event.preventDefault()
        const form = event.target
        const task = form.task.value
        const quickNote = form.quickNote.value
        const isSubmitted = true
        const updateFields = {
          task, quickNote, isSubmitted
        }

        toast.promise(axiosSecure.post(`/submit-task`, {contestId: contest._id, user_email: user?.email, updateFields})
        .then(res => {
          console.log(res)
            update()
        })
        , {
            loading: 'Submitting...',
            success: 'Submitted successfully',
            error: 'Submission failed'
        })


    }
  


    return (
        <div className="section border shadow-xl mt-5 p-5 rounded-xl">
        <div onClick={() => navigate('/all_contest')} className="flex border cursor-pointer p-3 rounded-xl w-[100px] items-center gap-2 font-bold text-green-600"><MoveLeft/> Back</div>

         {
            contest &&
            <div className=" mt-5 flex lg:flex-row md:flex-row flex-col justify-between lg:gap-2 gap-10 md:gap-1">
               <div className="lg:w-1/2 md:w-1/2 lg:border-r md:border-r lg:pr-5 md:pr-5">

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

             
           
                {!winner &&
                  <>{
                  (registered) ? <div className='mt-5  text-center rounded-md flex items-center justify-center p-4 font-bold  text-xl w-full bg-green-400 gap-3'> <CheckCircle/> Registered </div>:
                   <div className='flex justify-center  mt-5'>
                   {!expire && <Link className='w-full' to={`/payment/${contest._id}`}><Button className='btn w-full bg-green-600'> Register Now <MoveRight/></Button></Link>}
                   {expire && <Button disabled className='btn w-full bg-green-600'> Register Now <MoveRight/></Button>}
                  </div>}
                  </>
                }
               

               </div>

               <div className="relative lg:w-1/2 md:w-1/2 lg:border-l md:border-l lg:pl-5 md:pl-5">
               {/* <Confetti
                    
                    width={400}
                    height={800}
                  /> */}
               {!winner &&<>
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
              </>}

              { (registered && !expire && !self.isSubmitted) && 
              <div>
                <div className="text-2xl font-bold mt-5">Task submission</div>
                <p className="text-sm">Submit your task now to get the prize</p>
                <form onSubmit={handleSubmitTask}>
                  <Input
                   type="text"
                   placeholder="Your task URL"
                   className="mt-3"
                   name="task"
                  />

                  <Textarea
                  placeholder="Quick Note"
                  className="mt-3"
                  name="quickNote"
                  />

                  <Button className="mt-3">Submit</Button>
                </form>

              </div> }

              {(registered && self?.isSubmitted && !winner) && <div className="text-center mt-5">
                <div className="text-2xl font-bold">Task submitted</div>
                <p className="text-sm">Your task has been submitted successfully.</p>
              </div>}

              {
                winner && <div className="text-center shadow-2xl p-5 rounded-xl flex items-center flex-col">
                  
                  <div className="text-3xl font-black">Winner!!!</div>
                  
                  <div className="relative mt-10 flex justify-center flex-col items-center">
                   <Confetti
                   width={150}
                   />
                   <div className="absolute top-[-50px]"><img className="h-[70px]" src="https://i.postimg.cc/6prwFT6k/image.png" alt="crown"/></div>
                    <img className="rounded-full h-[100px] w-[100px]" src={winner.photoURL}/>
                    <div className="font-bold text-2xl">{winner.name}</div>
                    <div className="">{winner.email}</div>
                  </div>
                  

                  <div className="flex gap-5 items-center mt-5">
                  <img className="h-[50px]" src="https://images-platform.99static.com/7qa3U7A2HyhjidneoU9AlNJEObI=/500x500/top/smart/99designs-contests-attachments/49/49121/attachment_49121352"/>
                  <div className="text-3xl font-bold">${contest.price_money}</div>
                  </div>

                </div>
               }


               </div>

             
            </div>
         }
     
     </div>
    );
};

export default ContestDetails;