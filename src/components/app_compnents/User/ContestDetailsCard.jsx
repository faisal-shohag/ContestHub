
import { DollarSign, Gift } from 'lucide-react';
import PropTypes from 'prop-types';

const ContestDetailsCard = ({contest}) => {
    const {image, name, price, price_money, description} = contest
    return (
        <div className='border p-2 shadow-2xl rounded-xl max-w-[400px]'>
            
            <div className='flex justify-center h-[180px] rounded-xl bg-cover bg-center bg-no-repeat' style={{backgroundImage: `url("${image}")`}}>
            </div>

            <div className='px-2 py-2'>
                 <div className='font-bold text-xl'>{name}</div>
                 <div className='text-sm text-truncate mt-1'>{description}</div>

              <div className='mt-2 flex items-center gap-3'>
                Pay
                <div className='text-xl font-bold flex items-center gap-1 border p-2 rounded-xl'><DollarSign size={23}/>{price} </div>
                to win
                <div className='text-xl font-bold flex items-center gap-1 border p-2 rounded-xl'><Gift size={23}/>${price_money} </div>
           
              </div>

                
            </div>
        </div>
    );
};
ContestDetailsCard.propTypes = {
    contest: PropTypes.object
};
export default ContestDetailsCard;