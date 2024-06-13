
const Benefits = () => {
    return (
        <div className="section mt-4 relative flex flex-col">
      <div
        className="h-[300px] text-center rounded-xl  w-full bg-cover bg-no-repeat bg-bottom"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/6qyzH98c/image.png')",
        }}
      >

        <div className="mt-20 font-bold text-white">Benefits</div>
        <div className="font-black text-4xl mt-5 bg-gradient-to-r text-white ">
        Let’s make your ideas break through
        </div>

        {/* <div className="text-white mt-10 flex items-center gap-5 justify-center">
          <div className="flex flex-col justify-center items-center gap-3 bg-gray-950/85 p-3 rounded-2xl w-[150px]">
            <img
              className="h-[60px]"
              src="https://files.codingninjas.com/highest_ctc-1707199475-1707374485.webp"
            />

            <div className="font-bold">1 Cr+ highest CTC</div>
          </div>

          <div className="flex flex-col justify-center items-center gap-3 bg-gray-950/85 p-3 rounded-2xl w-[150px] ">
            <img
              className="h-[60px]"
              src="https://files.codingninjas.com/128_average_hike-1-1707197928-1707374485.webp"
            />

            <div className="font-bold ">128% average hike</div>
          </div>

          <div className="flex flex-col justify-center items-center gap-3 bg-gray-950/85 p-3 rounded-2xl w-[150px]">
            <img
              className="h-[60px]"
              src="https://files.codingninjas.com/placed_in_maang-1707199621-1707374485.webp"
            />

            <div className="font-bold">1400+ placed in MAANG</div>
          </div>
        </div> */}

        {/* <center className="mt-10">
          <img src="https://files.codingninjas.com/group-1000004169-.svg" />
        </center> */}

        <div className="mt-5 font-bold text-2xl text-white">
        Find the most up-to-date contests that suits your passion.
        </div>
      </div>

      <div className="mt-10 text-center text-2xl font-black">Increase your creativity</div>

      <div className="grid pl-16 lg:grid-cols-3 md:grid-cols-3 grid-cols-1  gap-5 mt-10 px-10 place-content-center lg:pl-0  md:pl-16 w-full">

        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl relative max-w-[300px] flex flex-col justify-center items-center shadow-2xl border">
          <div className="top-[-60px]">
            <video
              className="rounded-full h-[100px] w-[100px]"
              autoPlay
              loop
              muted
              disableRemotePlayback
              src="https://fps.cdnpk.net/home/benefits/benefit-quality.mp4"
            />
          </div>
          <div className="font-bold text-xl mt-7">Best quality or nothing</div>

          <div className="text-sm mt-5">
          Download scroll-stopping images of the highest quality to make professional designs.
          </div>
        </div>

        

        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl relative max-w-[300px] flex flex-col justify-center items-center shadow-2xl border">
          <div className="top-[-60px]">
            <video
              className="rounded-full h-[100px] w-[100px]"
              autoPlay
              loop
              muted
              disableRemotePlayback
              src="https://fps.cdnpk.net/home/benefits/benefit-content.mp4"
            />
          </div>
          <div className="font-bold text-xl mt-7">Fresh contests every day</div>

          <div className="text-sm mt-5">
          Our library is updated on a daily basis so you can find the newest and trendiest photos and designs.
          </div>
        </div>

    


        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl relative max-w-[300px] flex flex-col justify-center items-center shadow-2xl border">
          <div className="top-[-60px]">
            <video
              className="rounded-full h-[100px] w-[100px]"
              autoPlay
              loop
              muted
              disableRemotePlayback
              src="https://fps.cdnpk.net/home/benefits/benefit-think.mp4"
            />
          </div>
          <div className="font-bold text-xl mt-7">If you can think of it, you can find it</div>

          <div className="text-sm mt-5">
          Guaranteed search results: there’s an image and style for every project you might think of.
          </div>
        </div>

     
   

        

     
      </div>


      <div className="w-full shadow-2xl mt-20 rounded-2xl p-5 flex justify-center flex-col items-center font-poppins relative bg-gradient-to-r from-red-500 via-orange-400 to-purple-900 text-white">

        <div className="absolute top-[-70px]"><img className="h-[150px]" src="https://i.postimg.cc/tg32yJyT/image.png" alt="joy"/></div>
        <div className="font-bold text-xl mt-12 flex items-center">Become <img className="h-[40px]" src="https://i.postimg.cc/XYSGZD9T/logo.png"/> Creator</div>
        
        <duv className=" flex items-center font-bold gap-5 ">
            <img className="h-[50px]" src="https://cdn-icons-png.flaticon.com/512/845/845752.png"/>
            Earn Cash
        </duv>

        <div className="text-sm">
        Join ContestHUB creator community and start selling your content
        </div>


        <button className="btn  mt-5 btn-sm  shadow-2xl ">Explore</button>



      </div>





    </div>
    );
};

export default Benefits;