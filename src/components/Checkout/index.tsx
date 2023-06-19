import React from 'react';
import { motion } from 'framer-motion'
import Header from './Header';
import Body from './Body';

const Checkout = ({ handler } : { handler: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x:200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x:200 }}
      className="w-full h-screen md:w-[350px] bg-white md:backdrop-blur-sm flex flex-col z-[101] drop-shadow-xl fixed top-0 right-0"
    >
      <Header action={handler} />
      <Body action={handler}/>
    </motion.div>
  );
};

export default Checkout;