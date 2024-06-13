
import SocialLogin from '@/components/app_compnents/Common/SocialLogin';
import { Input } from '@/components/ui/input';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { AuthContext } from '@/providers/AuthProvider';
import { useContext, useEffect, useRef, useState} from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

const Registration = () => {
  const captchaRef = useRef(null)
  const [matched, setMatched] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const {createUser, updateUserProfile} = useContext(AuthContext)
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()


    const onSubmit = data => {
      if(!matched){
        toast.error('Captcha does not matched!')
        return;
       }

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                toast.success('Successfully Registered!')

                //send user to database
                axiosSecure.post('/user', {...data, role: 'user', created_at: new Date()})
                .then(res => {
                    console.log(res.data);
                    
                })
                .catch(error => {
                    console.log(error);
                    // toast.error(error.message)
                    setTimeout(() => {
                      window.location.reload()
                  }, 1500)
                })

                updateUserProfile({displayName: data.name, photoURL: data.photoURL})
                
                navigate('/')
                    reset();
                
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message)
                setTimeout(() => {
                  window.location.reload()
              }, 1500)
          })

    }


    const handleValidateCaptcha = () => {
      const user_captcha_value = captchaRef.current.value
      if (validateCaptcha(user_captcha_value)) {
          setMatched(true);
          console.log('Captcha Matched');
      }
      else {
          console.log('Captcha Does Not Matched');
          setMatched(false);
      }
  }


  useEffect(() => {
    loadCaptchaEnginge(6);
}, [])




  return (
    <>
    <Helmet>
      <title>ContestHub | Registration</title>
    </Helmet>
    
    

      <div className="w-full lg:grid lg:min-h-[600px]  lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="min-w-[400px] grid  gap-6">
          <div className="grid gap-2 text-center">
          <div className='flex justify-center'><img className='h-[70px]' src='https://i.postimg.cc/XYSGZD9T/logo.png'/></div>

            <h1 className="text-3xl font-bold">Registration</h1>
            <p className="text-balance text-muted-foreground">
              Enter your info below to register.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <Input
                  type="text"
                  placeholder="Name"
                  name="name"
                  {...register("name", { required: true })}
                  className="input input-bordered"
  
                />
                {errors.name && <span className='text-red-600'>This field is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <Input
                  type="text"
                  placeholder="Photo URL"
                  name="photoURL"
                  {...register("photoURL", { required: true })}
                  className="input input-bordered"
  
                />
                {errors.photoURL && <span className='text-red-600'>This field is required</span>}
              </div>

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
                
                />
                {errors.email && <span className='text-red-600'>This field is required</span>}
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
                  {...register("password", { required: true, maxLength: 20, minLength: 6, 
                  pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/
                  })}
                 
                />
                <div className='mt-2'>
                {errors.password && <span className='text-red-600'>This field is required!</span>}
                {errors.password?.type === 'minLength' && <span className='text-red-600'> Password must be 6 characters long.</span>}
                {errors.password?.type === 'pattern' && <span className='text-red-600'> Password must contain at least one letter, one number, one uppercase and one lowercase character.</span>}
                </div>
              </div>

             

<div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <Input
                ref={captchaRef}
                  type="text"
                  placeholder="Captcha"
                  name="captcha"
                  className="input input-bordered"
                  required
                />
                {/* <button onClick={handleValidateCaptcha} className="btn btn-outline btn-primary btn-xs mt-2">Verify</button> */}
              </div>
              <div className="form-control mt-2">
                <button onClick={handleValidateCaptcha}   className="btn btn-primary">Sign Up</button>
              </div>
              <p className='text-center'>Already have an account? <Link to='/login' className='text-orange-600'>Login</Link></p>
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

export default Registration;
