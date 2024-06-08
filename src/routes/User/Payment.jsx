import { useParams } from 'react-router-dom'

const Payment = () => {
    const params = useParams();
    console.log(params.id);
    return (
        <div className='section border shadow-xl mt-5 p-5 rounded-xl'>
            Payment
        </div>
    );
};

export default Payment;