import { Button } from '@/components/ui/button';
import { DollarSign, Gift, MoveRight, Users } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const ContestCard = ({contest}) => {
    const {_id, image, name, price, due, price_money, participationsCount, description} = contest
    return (
        <div className='border p-2 rounded-xl max-w-[400px]'>
            
            <div className='flex justify-center h-[180px] rounded-xl bg-cover bg-center bg-no-repeat' style={{backgroundImage: `url("${image}")`}}>
            </div>

            <div className='px-2 py-2'>
                 <div className='font-bold text-xl'>{name}</div>
                 <div className='text-sm text-truncate mt-1'>{description}</div>

              <div className='mt-2 flex items-center gap-3'>
                <div className='text-sm font-bold flex items-center gap-1 border p-2 rounded-xl'><Users size={15}/>{participationsCount} </div>
                
                <div className='text-sm font-bold flex items-center gap-1 border p-2 rounded-xl'><DollarSign size={15}/>{price} </div>

                <div className='text-sm font-bold flex items-center gap-1 border p-2 rounded-xl'><Gift size={15}/>${price_money} </div>
           
              </div>

                <div className='flex justify-center  mt-5'>
                 <Link className='w-full' to={`/contest-details/${_id}/${due}`}><Button className='btn w-full'>View Details <MoveRight/></Button></Link>
                </div>
            </div>
        </div>
    );
};
ContestCard.propTypes = {
    contest: PropTypes.object
};
export default ContestCard;