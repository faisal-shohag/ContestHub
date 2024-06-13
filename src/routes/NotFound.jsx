import { Button } from "@/components/ui/button";
import { useRouteError, Link } from "react-router-dom";

const NotFound = () => {

    const error = useRouteError()

    return (
        <div style={{backgroundImage: "url('/bg.jpg')"}} className="w-full h-svh bg-cover bg-center flex items-center  flex-col text-center">
            <span className="grayscale hover:grayscale-0">
            <div className="mt-32 animate__animated animate__fadeIn w-full flex justify-center  ">
                <img className="h-[150px] " src="https://i.postimg.cc/XYSGZD9T/logo.png" alt="logo"/>
            </div>

           

            <div className="font-black text-6xl mt-3 text-gray-900 animate__animated animate__fadeInUp animate__delay-1s">
                404
                <div className="text-sm">{error.error.message}</div>
            </div>

            <div className="custom-glass mt-3 font-black font-philo text-xl animate__animated animate__fadeInUp animate__delay-2s">
                You are out of the world!
            </div>

            <Link className="animate__animated animate__fadeInUp animate__delay-3s" to="/"><Button className="btn mt-3 bg-[#372249] text-white outline-none border-none ">Go Back</Button></Link>
            </span>
        </div>
    );
};

export default NotFound;