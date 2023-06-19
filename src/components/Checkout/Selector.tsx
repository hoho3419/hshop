import React from 'react';
import { CreaditCard } from '../Assets';

const Selector = () => {
  return (
    <div className='my-3 flex w-full rounded-t-[2rem] justify-center p-3'>
      <div className='px-2 py-1 rounded-full flex items-center justify-center'>
        <label htmlFor="type2" className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="type"
            id="type2"
            defaultChecked
            className='form-radio h-5 w-5 text-orange-500 cursor-pointer'  
          />
          <img 
            src={CreaditCard}
            alt="신용카드"
            className="h-8 ml-3"
          />
        </label>
      </div>
    </div>
  );
};

export default Selector;