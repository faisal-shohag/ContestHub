import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/providers/AuthProvider';
import { useContext, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import SocialLogin from '@/components/app_compnents/Common/SocialLogin';

const Login = () => {
  const captchaRef = useRef(null)
  const { register, handleSubmit } = useForm()
  const {signIn} = useContext(AuthContext)
  const [matched, setMatched] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/';
 
    const onSubmit = data => {
       if(!matched){
        toast.error('Captcha does not matched!')
        return;
       }
        console.log(data);
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
      <title>ContestHub | Login</title>
    </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
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
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="input input-bordered"
                  {...register("password", { required: true })}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
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
                <button onClick={handleValidateCaptcha} className="btn btn-primary">Login</button>
              </div>
              <p className='text-center'>Don&apos;t have an account? <Link to='/register' className='text-orange-600'>Register</Link></p>
            </form>

            <SocialLogin/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
