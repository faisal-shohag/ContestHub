import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn, githubSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/';

  const handleGoogleSignIn = () => {
    toast.promise(
      googleSignIn()
        .then((result) => {
          axiosPublic
            .post("/user", {
              email: result.user.email,
              name: result.user.displayName,
              photoURL: result.user.photoURL,
              role: "user",
              created_at: new Date(),
            })
            .then((res) => {
              console.log(res.data);
            });
            navigate(from, { replace: true })
        }),
      {
        loading: "Signing In...",
        success: "Successfully Signed In!",
        error: (error) => `Sign in Failed! ${error}`,
      }
    );
  };

  const handleGithubSignIn = () => {
    toast.promise(
        githubSignIn()
          .then((result) => {
            axiosPublic
              .post("/user", {
                email: result.user.email,
                name: result.user.displayName,
                photoURL: result.user.photoURL,
                role: "user",
                created_at: new Date(),
              })
              .then((res) => {
                console.log(res.data);
              });
              navigate(from, { replace: true })
          }),
        {
          loading: "Signing In...",
          success: "Successfully Signed In!",
          error: (error) => `Sign in Failed! ${error}`,
        }
      );
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1/2 h-[2px] bg-gray-500"></div>
        <div className="">or</div>
        <div className="w-1/2 h-[2px] bg-gray-500"></div>
      </div>
      <div className="flex flex-col mx-5 justify-center gap-3 mb-10">
        <Button variant="outline" onClick={handleGoogleSignIn} className="btn">
          <FaGoogle /> Google SignIn
        </Button>
        <Button variant="outline" onClick={handleGithubSignIn} className="btn">
          <FaGithub /> Github SignIn
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;
