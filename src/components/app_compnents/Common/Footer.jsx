

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full border p-10 rounded-lg mt-20">
      <div className="md:flex lg:flex  items-start">
        <div className="flex flex-col  items-center mb-5 md:border-r-[1px]  lg:border-r-[1px] lg:pr-10 min-w-[150px] font-philo">
          <img className="h-[100px]" src="https://i.postimg.cc/XYSGZD9T/logo.png" />
          
          <div className="font-black">ContestHUB</div>
          <div className="font-bold text-[12px] text-center">Create, Participate & Win</div>
        </div>
      <div className="flex lg:flex flex-col lg:flex-row justify-between w-full lg:pl-10 md:pl-10 font-philo">
        <div className="grid md:grid-cols-3 md:gap-20 lg:gap-20 gap-5 place-content-center text-center md:text-left lg:text-left">
          <div>
            <div className="font-medium text-indigo-500">Site Map</div>
            <ul className="text-sm">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/all_cotests">All Contests</Link>
              </li>
              <li>
                <Link to="/leaderboard">Leaderboard</Link>
              </li>
              <li>
                <Link to="/success-stories">Success Stories</Link>
              </li>
              <li>
                <Link to="/benefits">Benefits</Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-medium text-indigo-500">Service</div>
            <ul className="text-sm">
              <li>
                <Link to="/">Become Creator</Link>
              </li>
              <li>
                <Link to="/">Contact us</Link>
              </li>
              <li>
                <Link to="/">About us</Link>
              </li>
              <li>
                <Link to="/">Customer Service</Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-medium text-indigo-500">Resources</div>
            <ul className="text-sm">
              <li>
                <Link to="/">Using Circle</Link>
              </li>
              <li>
                <Link to="/">DOCS</Link>
              </li>
              <li>
                <Link to="/">Support</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex lg:items-start flex-col mt-10 items-center lg:mt-0 ">
          <div>
            <div className="font-bold">Get in Touch</div>
            <div className="flex items-center gap-3 text-2xl mt-3">
            <FaFacebook />
              <FaTwitch />
              <FaLinkedin />
              <FaInstagram />
            </div>
          </div>
        <div className="lg:block md:block hidden">
          <div className="lg:bg-indigo-200 md:bg-indigo-200 flex rounded-full  lg:flex-row md:flex-row flex-col mt-10 justify-between dark:bg-gray-600 shadow-md">
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input focus:outline-none border-none  rounded-full pl-6 text-black bg-indigo-200 dark:bg-gray-600 py-2"
              required
            />
            <button className="bg-indigo-500 px-5   rounded-full lg:mt-0 md:mt-0 mt-2 py-2 shadow-xl text-white">Subscribe</button>
          </div>
          </div>
        <div className="lg:hidden md:hidden block">
          <div className="lg:bg-gray-200 md:log:bg-gray-200 flex rounded-full  lg:flex-row md:flex-row flex-col mt-10 justify-between  shadow-md">
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input focus:outline-none border-none  rounded-full pl-6 text-black bg-gray-200 dark:bg-gray-600 py-2"
              required
            />
            <button className="bg-blue-700 px-5   rounded-full lg:mt-0 md:mt-0 mt-2 py-2 shadow-xl text-white">Subscribe</button>
          </div>
          </div>

        </div>
        </div>
      </div>

      <hr  className="mt-7"/>
      <div className="text-sm text-center mt-5">
       
        ContestHub &copy; 2024, All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;