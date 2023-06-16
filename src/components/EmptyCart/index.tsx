import React from 'react';
import { EmptyCartImg } from '../Assets';

const EmptyCart = () => {
  return (
    <div className='w-full flex flex-col items-center gap-4 justify-center'>
      <img src={EmptyCartImg} alt="빈 카트 이미지" className='h-[340px]'/>
      <p className='text-textColor font-semibold'>장바구니가 비어 있습니다.</p>
    </div>
  );
};

export default EmptyCart;