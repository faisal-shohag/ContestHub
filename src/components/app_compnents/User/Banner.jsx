import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Frown, Search } from "lucide-react";
import SearchContent from "./SearchContent";
import { useState } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Loading from "../Common/Loding";

const Banner = () => {
    const axiosPublic = useAxiosPublic()

    const [keyword, setKeyword] = useState('');
    const [contests, setContests] = useState([]);
    const [show, setShow] = useState(false)
    const [isData, setIsData] = useState(false)

    const handleSearch = async (e) => {
        e.preventDefault();
        setShow(true)
        try {
          const response = await axiosPublic.get('/contests/search', {
            params: { keyword: keyword }
          });
          setContests(response.data.data);
          setIsData(true)
        } catch (error) {
          console.error('Error fetching contests:', error);
        }
      };
      
    return (
        <div style={{backgroundImage: "url('https://i.postimg.cc/9QX5Fsqz/image.png')"}} className="w-full bg-cover flex flex-col justify-center items-center mt-5 rounded-xl bg-gray-200 h-[350px]">
            <div className="flex justify-center animate-pulse hover:animate-spin"><img className="h-[100px]" src="https://i.postimg.cc/XYSGZD9T/logo.png"/></div>
            <div className="text-3xl text-center font-black text-white mb-10">Unleash Your Creativity. Win Big. Join the Community of Innovators</div>
            <form  tabIndex={-1} onBlur = {() =>{ 
              setTimeout(()=> {
                setShow(false); setIsData(false)
              }, 100)
            }} onSubmit={handleSearch} className="">
            <div className="relative">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
             <div className="flex items-center">
             <Input
                onChange={(e) => setKeyword(e.target.value)}
                type="search"
                
                placeholder="Search contests...(Write something & Press Enter)"
                className="pl-8 min-w-[400px] rounded-full"
              /> 
              {/* <button type="submit" className="flex  bg-white rounded-full dark:bg-slate-950 p-2 items-center shadow-2xl"><img className="h-6 w-6" src="https://i.postimg.cc/XYSGZD9T/logo.png"/></button> */}

             </div>
             {show && <div  className="mt-1 absolute w-full shadow-2xl">
                 <Card  className="pb-2 px-2">
                  { isData ? <>
                    {contests.length!=0 ?<>
                    {
                        contests.map((contest, index) => (
                            <SearchContent key={index} contest={contest}/>
                        ))
                    }
                    </> : <div className="text-center mt-2 text-sm font-semibold flex justify-center items-center gap-2"><Frown size={18}/> No contest found!</div>}
                    </> : <Loading/> }
                </Card>
             </div>}
            </div>
          </form>
        </div>
    );
};

export default Banner;