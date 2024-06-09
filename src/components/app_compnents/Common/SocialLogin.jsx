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
      <div className="flex flex-col mx-5 justify-center gap-3 mb-10">
        <button onClick={handleGoogleSignIn} className="btn">
          <FaGoogle /> Google Sign In
        </button>
        <button onClick={handleGithubSignIn} className="btn">
          <FaGithub /> Github Sign In
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
