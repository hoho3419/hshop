import React from 'react';
import { useRecoilState } from 'recoil';
import { cartItemsState } from '../../store/recoilState';
import CartItem from './Item';
import CartTotal from './Total';

const CartBody = ({ action }: { action: any}) => {
  const cartItems = useRecoilState(cartItemsState)[0];
  
  return (
    <div className='w-full h-full rounded-t-[2rem] bg-cartBg flex flex-col'>
      <div className='w-full h-[340px] md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-hidden'>
        {
          cartItems && cartItems.length > 0 && cartItems.map((item,index) => {
            return <CartItem key={index} item={item}/>
          })
        }
      </div>
      <CartTotal checkoutState={action}/>
    </div>
  );
};

export default CartBody;