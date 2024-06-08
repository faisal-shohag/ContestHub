import Banner from "@/components/app_compnents/User/Banner";
import PopularContests from "@/components/app_compnents/User/PopularContests";

const Home = () => {
    return (
        <div>

          <div className="section">
            <Banner/>

            <div className="mt-10">
              <PopularContests/>
            </div>
          </div>
        
        </div>
    );
};

export default Home;