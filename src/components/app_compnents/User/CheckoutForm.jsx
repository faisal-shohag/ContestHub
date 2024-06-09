import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PropTypes from 'prop-types'
import ContestDetailsCard from "./ContestDetailsCard";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({contest}) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure()
  const [clientSecret, setClientSecret] = useState('')
  const {user} = useAuth()
  const navigate = useNavigate()


  useEffect(() => {
        axiosSecure.post('/create-payment-intent', {price: parseInt(contest.price)})
        .then(res => {
            const clientSecret = res.data.clientSecret;
            setClientSecret(clientSecret)
            console.log(clientSecret);
            // stripe.handleCardPayment(clientSecret).then(paymentRes => {
            //     console.log(paymentRes);
            //     if(paymentRes.error){
            //         toast.error(paymentRes.error.message)
            //     }else{
            //         toast.success('Payment Successful')
            //     }
            // })
        })

  }, [axiosSecure, contest.price])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
        return;
      }

      const card = elements.getElement(CardElement);

      if (card == null) {
        return;
      }


      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      })

      if (error) {
        console.log('[error]', error);
        toast.error(error.message);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
      }


    //confirm payment
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'anonymous',
            email: user?.email || 'anonymous',
          },
        },
      },
    );


    if(confirmError){
      toast.error(confirmError.message)
    } else {
      const data = {
        contestId: contest._id,
        transactionId: paymentIntent.id,
        user_email: user?.email,
        creator_email: contest.creator_email,
        paid_at: new Date(),
        isWinner: false,
        price: parseInt(contest.price)
      }

      toast.promise(
        axiosSecure.post('/payments', data)
        .then(res => {
          console.log(res.data);
          navigate(`/contest-details/${contest._id}/${contest.due}`)
          
        })
      , {
        loading: 'Payment processing...',
        success: 'Payment successful',
        error: 'Payment failed'
      })
    }

  };
  return (
    <div>
      <div className="mb-5 font-bold text-2xl">Checkout</div>
      <form className="max-w-[500px] shadow-2xl mx-auto border p-10 rounded-xl" onSubmit={handleSubmit}>
      <ContestDetailsCard contest={contest}/>
      <div className="mb-5 font-bold text-xl mt-10">Card Details</div>
        <div className="border px-5 py-10 rounded-xl shadow-2xl bg-gradient-to-r from-purple-600 to-pink-600">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                
                color: "#ffff",
                "::placeholder": {
                  color: "#aab7c4",
                },
                
              },
              invalid: {
                color: "#E94117",
              },
            },
          }}
        />
        

    
        <Button className="btn mt-10 w-full" type="submit" disabled={!stripe || !clientSecret}>
          Pay ${contest.price}
        </Button>
        </div>
      </form>
    </div>
  );
};

CheckoutForm.propTypes = {
  contest: PropTypes.object.isRequired
}

export default CheckoutForm;
