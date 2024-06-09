import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PropTypes from 'prop-types'

const CheckoutForm = ({contest}) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure()
  const [clientSecret, setClientSecret] = useState('')
  const {user} = useAuth()


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

      toast.promise(axiosSecure.post('/payments', data), {
        loading: 'Payment processing...',
        success: 'Payment successful',
        error: 'Payment failed'
      })
    }

  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <Button className="btn mt-5" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </Button>
      </form>
    </div>
  );
};

CheckoutForm.propTypes = {
  contest: PropTypes.object.isRequired
}

export default CheckoutForm;
