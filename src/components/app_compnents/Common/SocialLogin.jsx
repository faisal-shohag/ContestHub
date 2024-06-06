import { FaGithub, FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
    return (
        <div>
            <div className="flex flex-col mx-5 justify-center gap-3 mb-10">
                <button className="btn"><FaGoogle/> Google Sign In</button>
                <button className="btn"><FaGithub/> Github Sign In</button>
            </div>
        </div>
    );
};

export default SocialLogin;