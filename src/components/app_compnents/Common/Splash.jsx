
const Splash = () => {
    return (
        <div className="flex flex-col bg-white dark:bg-gray-950 custom-glass2 justify-center items-center fixed top-0 z-[9999] left-0 w-full h-full font-philo">
      <div className="animate__animated animate__fadeIn animate__slower">
        <img className="h-[150px] animate-ping" src="https://i.postimg.cc/XYSGZD9T/logo.png" alt="" />
      </div>
      <div className="font-black uppercase flex flex-col gap-0 items-center">
        <div
          id="king"
          className="text-2xl animate__animated animate__fadeInUp animate__delay-0s"
        >
          ContestHub
        </div>
        <div className="text-sm text-indigo-700 animate__animated animate__fadeInUp animate__delay-1s">
        Create, Participate & Win
        </div>
      </div>
      <div className="flex items-center gap-2 font-bold mt-10">
        <span className="loading loading-spinner loading-md animate__animated animate__fadeInUpBig animate__faster"></span>{" "}
        <span className="animate__animated animate__fadeIn animate__delay-1s">
          Launching...
        </span>
      </div>
    </div>
    );
};

export default Splash;