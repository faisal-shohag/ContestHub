import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import DatePicker from "react-datepicker";
  import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useContest from "@/hooks/useContest";


const EditContest = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { register, handleSubmit, setValue, watch } = useForm()
    const {getContestById} = useContest()

   

    const param = useParams()
    

    useEffect(()=> {
        const getContests = async() => {
            const contest = await getContestById(param.id)
            setValue('name', contest.name)
            setValue('image', contest.image)
            setValue('description', contest.description)
            setValue('price', contest.price)
            setValue('price_money', contest.price_money)
            setValue('type', contest.type)
            setValue('instruction', contest.instruction)
            setStartDate(new Date(contest.due))
        }
        getContests()
    }, [param.id, setValue])


    const axiosSecure = useAxiosSecure()
    
    const onSubmit = data => {
        data = {
            ...data,
            due: startDate,
            status: "pending",
        }

        toast.promise(
            axiosSecure.put('/contests/'+param.id, data),
            {
                loading: 'Updating...',
                success: 'Contest updated successfully',
                error: 'Something went wrong'
            }
        )

    }

    

    return (
        <div>
<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className=" px-10 border-r">
        <div className="mt-3">
          <div className="">
            <h1 className="text-3xl font-bold">Edit Contest</h1>
            <p className="text-balance text-muted-foreground">
              Edit contest here.
            </p>
          </div>
  
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 grid-cols-2 mt-5">

            <div>
              <Label htmlFor="name">Contest Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Contest name"
                {...register("name")}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Contest Image</Label>
              <Input
                id="image"
                name="image"
                type="text"
                placeholder="Contest image"
                {...register("image")}
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="description">Contest Description</Label>
              <Textarea
                id="description"
                name="description"
                type="text"
                placeholder="Description"
                {...register("description")}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Contest price</Label>
              <Input
                id="price"
                name="price"
                type="text"
                placeholder="Price"
                {...register("price")}
                required
              />
            </div>

            <div>
              <Label htmlFor="price_money">Prize money or others</Label>
              <Input
                id="price_money"
                name="price_money"
                type="text"
                placeholder="Prize money or others"
                {...register("price_money")}
                required
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="instruction">Text Instruction</Label>
              <Textarea
                id="instruction"
                name="instruction"
                type="text"
                placeholder="Instruction"
                {...register("instruction")}
                required
              />
            </div>

            

            <div>
            <div className="text-sm font-semibold">Contest type</div>
            
            <Select onValueChange={(value) => setValue("type", value)} value={watch('type')}>
            <SelectTrigger className="">
                <SelectValue placeholder="Contest Type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Image Design">Image Design</SelectItem>
                <SelectItem value="Article Writing">Article Writing</SelectItem>
                <SelectItem value="Marketing Strategy">Marketing Strategy</SelectItem>
                <SelectItem value="Digital Advertisement">Digital Advertisement</SelectItem>
                <SelectItem value="Gaming Review">Gaming Review</SelectItem>
                <SelectItem value="Business Idea Concerts">Business Idea Concerts</SelectItem>
                <SelectItem value="Movie Review">Movie Review</SelectItem>
                <SelectItem value="Book Review">Book Review</SelectItem>
            </SelectContent>
            </Select>
            </div>

            <div>
            <div className="text-sm font-semibold">Contest deadline</div>
            <DatePicker className="bg-white dark:bg-slate-950 border text-center w-full px-2 py-2 rounded-md" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>

           
            <Button type="submit" className="col-span-2">
              Update
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://img.freepik.com/free-vector/mural-artist-concept-illustration_114360-6335.jpg?t=st=1717762539~exp=1717766139~hmac=ce984d1697c18ff6d34b38bac08064dea9e211a5cb954803564022337335a8fb&w=740"
          alt="Image"
          width="1000"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
           
        </div>
    );
};

export default EditContest;