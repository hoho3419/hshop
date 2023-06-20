import React, { useState } from 'react';
import Checkout from '../Checkout';
import { motion } from 'framer-motion'
import CartHeader from './Header';
import { useRecoilState } from 'recoil';
import { cartItemsState } from '../../store/recoilState';
import CartBody from './Body';
import EmptyCart from '../EmptyCart';
import NotFound from '../NotFound';

const Cart = () => {
  const [checkoutOpen,setCheckoutOpen] = useState(false);
  const cartItems = useRecoilState(cartItemsState)[0];
  return (
    <>
     {checkoutOpen ? (
      <Checkout handler={setCheckoutOpen} />
     ) : (
      <>
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className='w-full h-screen md:w-[350px] bg-white md:backdrop-blur-sm flex flex-col z-[101] drop-shadow-xl fixed top-0 right-0'
        >
          <CartHeader />
          {cartItems && cartItems.length > 0 ? (
            <CartBody action={setCheckoutOpen}/>
          ) : (
            <div className='h-full w-full flex-1 flex items-center justify-center'>
              <EmptyCart />
            </div>
          )}
        </motion.div>
        {!cartItems && <NotFound text='장바구니를 사용할 수 없습니다' />}
      </>
     )} 
    </>
  );
};

export default Cart;