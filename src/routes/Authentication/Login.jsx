import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/providers/AuthProvider';
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import SocialLogin from '@/components/app_compnents/Common/SocialLogin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Login = () => {

  const { register, handleSubmit } = useForm()
  const {signIn} = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/';
 
    const onSubmit = data => {
        // console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                toast.success('Successfully Logged In!')
                navigate(from, { replace: true })
                
                
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message)
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            })
    }




  return (
    <>
    <Helmet>
      <title>ContestHub | Login</title>
    </Helmet>
      <div className="w-full lg:grid lg:min-h-[600px]  lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid  gap-6">
          <div className="grid gap-2 text-center">
            <div className='flex justify-center'><img className='h-[70px]' src='https://i.postimg.cc/XYSGZD9T/logo.png'/></div>
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className=" grid gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="input input-bordered"
                  {...register("password", { required: true })}
                  required
                />
              </div>
              <div className="form-control mt-2">
                <Button className="btn bg-blue-700 btn-primary">Login</Button>
              </div>
              <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline font-bold">
              Sign up
            </Link>
          </div>
            </form>
            <SocialLogin/>          
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1717914992~exp=1717918592~hmac=e7de97274ec10499693e7aa4b0505bca7f9c6912f8ba90848b8810387217a4ad&w=740"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
    </>
  );
};

export default Login;
