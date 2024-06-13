
import PropTypes from 'prop-types';

const CreatorCard = ({contest}) => {  
    const { image, name,  description, creatorDetails} = contest
    return (
        <div className='relative border bg-white dark:bg-gray-950 p-2 rounded-xl max-w-[250px]'>
            <div className='absolute flex flex-col items-center w-full justify-center top-[-50px]'>
                <div><img className='rounded-full border-[4px] w-[100px] h-[100px]' src={creatorDetails.photoURL}/></div>
                <div className='bg-white dark:bg-gray-950  px-2 py-1 font-bold shadow-2xl rounded-xl'>{creatorDetails.name}</div>
            </div>
            <div className='flex justify-center lg:h-[180px] md:h-[180px] h-[90px] rounded-xl bg-cover bg-center bg-no-repeat' style={{backgroundImage: `url("${image}")`}}>
            </div>

            <div className='px-2 py-2'>
                 <div className='font-bold md:text-md text-xs lg:text-xl'>{name}</div>
                 <div className='lg:text-sm md:text-sm text-xs text-truncate mt-1'>{description}</div>

              {/* <div className='mt-2 flex items-center gap-3'>
                <div className='text-sm font-bold flex items-center gap-1 border p-2 rounded-xl'><Users size={15}/>{participationsCount} </div>
                
                <div className='text-sm font-bold flex items-center gap-1 border p-2 rounded-xl'><DollarSign size={15}/>{price} </div>

                <div className='text-sm font-bold flex items-center gap-1 border p-2 rounded-xl'><Gift size={15}/>${price_money} </div>
           
              </div> */}

                {/* <div className='flex justify-center  mt-5'>
                 <Link className='w-full' to={`/contest-details/${_id}/${due}`}><Button className='btn w-full'>View Details <MoveRight/></Button></Link>
                </div> */}
            </div>
        </div>
    );
};
CreatorCard.propTypes = {
    contest: PropTypes.object
};
export default CreatorCard;