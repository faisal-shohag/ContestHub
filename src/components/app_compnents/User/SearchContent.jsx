import { Users } from "lucide-react";
import PropTypes from 'prop-types';
const SearchContent = ({contest}) => {
    const {image, name, price, price_money, participationsCount} = contest
    return (
        <div className=" cursor-pointer flex justify-between items-center  px-1 py-1 gap-2 border mt-2 rounded-xl">
           <div className="flex items-center gap-2">
           
            <div>
                <img className="h-10 w-10 rounded-xl" src={image} alt="image" />
            </div>
            <div className="py-1">
                <div className="text-sm font-semibold">{name}</div>
                <div className="flex items-center gap-2 text-xs">
                    <div className=" text-green-600 font-semibold">${price}</div>
                    <div className=" text-green-600 font-semibold flex items-center"><Users className="w-3 h-3 mr-1"/> {participationsCount}</div>
                </div>
            </div>
           
            </div>
            <div className="relative">
                <div className="bg-black absolute right-[1px] bottom-0 text-white text-xs  px-2 rounded-xl">${price_money}</div>
            <img className="h-10 w-10 rounded-xl" src="https://i.postimg.cc/8CbHFRM5/image.png" alt="image" /> 
            </div>
        </div>
    );
};

SearchContent.propTypes = {
    contest: PropTypes.object
};

export default SearchContent;