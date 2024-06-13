import { Crown } from "lucide-react";
import { Link } from "react-router-dom";

const AdvSection = () => {
    return (
        <div className="relative h-[220px] flex flex-col items-center justify-center text-center text-white w-full rounded-xl shadow-2xl border" style={{backgroundImage: "url('https://i.postimg.cc/DZPy3CKW/image.png')"}}>
            <div className="left-0 top-0 absolute h-[80px] shadow-2xl flex justify-center items-center border w-[80px] rounded-full"><img className="h-[70px] p-2  " src="https://i.postimg.cc/XYSGZD9T/logo.png"/></div>
            
            <div className="text-center font-black text-2xl mb-2">Unleash Your passion and Participate!</div>
            <div className="text-center text-sm">Get the chance to win exciting prizes!</div>
            <div className="text-xl mt-2">We give you the most suitable contest according to your passoion!</div>
           <Link to="/all_contest"> <button className="bg-[#8000ff] text-white font-bold py-2 px-4 rounded mt-4 flex items-center gap-2"><Crown/> Get Started</button></Link>
        </div>
    );
};

export default AdvSection;