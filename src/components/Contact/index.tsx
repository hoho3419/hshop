import React from 'react';
import { motion } from 'framer-motion';
import ContactHeader from './Header';
import ContactForm from './Form';


const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      className='w-full h-screen md:w-[350px] bg-white md:backdrop-blue-sm flex flex-col z-[101] drop-shadow-xl fixed top-0 left-0'
    >
      <ContactHeader />
      <ContactForm />
    </motion.div>
  );
};

export default Contact;