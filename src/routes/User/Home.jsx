import AdvSection from "@/components/app_compnents/User/AdvSection";
import Banner from "@/components/app_compnents/User/Banner";
import PopularContests from "@/components/app_compnents/User/PopularContests";
import TopCreators from "@/components/app_compnents/User/TopCreators";

const Home = () => {
    return (
        <div>

          <div className="section">
            <Banner/>

            <div className="mt-10">
              <PopularContests/>
            </div>

            <div className="mt-20">
              <AdvSection/>
            </div>

            
            
            <div className="mt-20">
              <TopCreators/>
            </div>

          </div>
        
        </div>
    );
};

export default Home;