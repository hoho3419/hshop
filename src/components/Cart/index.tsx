import React, { useState } from 'react';
import Checkout from '../Checkout';
import { motion } from 'framer-motion'
import CartHeader from './Header';

const Cart = () => {
  const [checkoutOpen,setCheckoutOpen] = useState(false);

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
        </motion.div>
      </>
     )} 
    </>
  );
};

export default Cart;