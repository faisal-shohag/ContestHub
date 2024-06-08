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
          const response = await axiosPublic.get('http://localhost:5000/contests/search', {
            params: { keyword: keyword }
          });
          setContests(response.data.data);
          setIsData(true)
        } catch (error) {
          console.error('Error fetching contests:', error);
        }
      };
      
    return (
        <div className="w-full flex justify-center items-center mt-5 rounded-xl bg-gray-200 h-[300px]">
            <form  tabIndex={-1} onBlur = {() =>{ setShow(false); setIsData(false)}} onSubmit={handleSearch} className="">
            <div className="relative">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                onChange={(e) => setKeyword(e.target.value)}
                type="search"
                
                placeholder="Search contests..."
                className="pl-8 min-w-[400px] rounded-full"
              />

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