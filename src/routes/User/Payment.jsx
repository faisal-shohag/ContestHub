import Loading from '@/components/app_compnents/Common/Loding';
import CheckoutForm from '@/components/app_compnents/User/CheckoutForm';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

const stripePromise = loadStripe(import.meta.env.VITE_stripeKey)

const Payment = () => {
    const axiosSecure = useAxiosSecure()
    const params = useParams()
    const [contest, setContest] = useState(null)

    useEffect(()=> {
        axiosSecure.get(`/contests/${params.id}`)
        .then(res => {
            // console.log(res.data.data)
            setContest(res.data.data)
        })
    }, [axiosSecure, params.id])




    return (
        <div className='section border shadow-xl mt-5 p-5 rounded-xl'>
           {
           contest ?  <Elements stripe={stripePromise}>
             <CheckoutForm contest={contest}/>
         </Elements> : <Loading/>
           }
        </div>
    );
};

export default Payment;