
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { AuthContext } from '@/providers/AuthProvider';
import { useContext} from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const {createUser, updateUserProfile} = useContext(AuthContext)
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()


    const onSubmit = data => {
        console.log(data);

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
                })

                updateUserProfile(data.name, data.photoURL)
                .then(() => {
                  // toast.success('Name and Photo updated!')
                    navigate('/')
                    reset();
                })
                .catch(error => {
                    console.log(error);
                    toast.error(error.message)
                })
            })
            .catch(error => {
                console.log(error);
                toast.error(error.message)
          })

    }




  return (
    <>
    <Helmet>
      <title>ContestHub | Registration</title>
    </Helmet>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
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
                <input
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
                <input
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
                <input
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

              {/* <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  ref={captchaRef}
                  placeholder="Captcha"
                  name="captcha"
                  className="input input-bordered"
                  required
                />
                <button onClick={handleValidateCaptcha} className="btn btn-outline btn-primary btn-xs mt-2">Verify</button>
              </div> */}
              <div className="form-control mt-2">
                <button  className="btn btn-primary">Sign Up</button>
              </div>
              <p className='text-center'>Already have an account? <Link to='/login' className='text-orange-600'>Login</Link></p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
