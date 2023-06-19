import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'
import { MdShoppingBasket } from 'react-icons/md';
import { useRecoilState } from 'recoil'
import { showCartState,showContactFormState,cartItemsState } from '../../store/recoilState'; 

const Navigations = () => {
  const setShowCart = useRecoilState(showCartState)[1];
  const setShowContact = useRecoilState(showContactFormState)[1];
  const cartItems = useRecoilState(cartItemsState)[0];
  return (
    <div className='flex items-center gap-8'>
      <motion.ul
        initial={{opacity: 0,x: 200}}
        animate={{opacity: 1,x: 0}}
        exit={{opacity: 0, x: 200}}
        className={'flex items-center gap-8 '}
      >
        <motion.li
          whileHover={{scale: 1.1}}
          className='md:text-sm lg:text-md text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'
        >
          <Link to={'/'}>Home</Link>
        </motion.li>
        <motion.li
          whileHover={{scale: 1.1}}
          className='md:text-sm lg:text-md text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'
        >
          <Link to={'/menu'}>Menu</Link>
        </motion.li>
        <motion.li
          whileHover={{scale: 1.1}}
          className='md:text-sm lg:text-md text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'
        >
          <Link to={'/services'}>Services</Link>
        </motion.li>
        <motion.li
          whileHover={{scale: 1.1}}
          className='md:text-sm lg:text-md text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'
        >
          <Link to={'/about'}>About us</Link>
        </motion.li>
        <motion.li
          whileHover={{scale: 1.1}}
          className='md:text-sm lg:text-md text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'
          onClick={() => setShowContact((prev) => !prev)}
        >
          Contact me
        </motion.li>
      </motion.ul>

      <motion.div
        whileTap={{scale: 0.9}}
        whileHover={{scale: 1.1}}
        className='relative flex items-center justify-center text-textColor'
        onClick={() => setShowCart((prev) => !prev)}
      >
        <MdShoppingBasket className='text-2xl cursor-pointer'/>
        <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center cursor-pointer'>
          {cartItems.length}
        </div>
      </motion.div>
    </div>
  );
};

export default Navigations;