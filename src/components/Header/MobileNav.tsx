import React from 'react';
import { MdOutlineRestaurantMenu, MdShoppingBasket } from "react-icons/md";
import { Link } from "react-router-dom";
import { bikeDelivery } from "../Assets";
import { motion } from "framer-motion";
import { cartItemsState,showCartState,showContactFormState } from '../../store/recoilState';
import { useRecoilState } from 'recoil'

const MobileNav = ({
  isOpen,
  setIsOpen
}:{
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const cartItems = useRecoilState(cartItemsState)[0];
  const setShowCart = useRecoilState(showCartState)[1];
  const setShowContactForm = useRecoilState(showContactFormState)[1];

  return (
    <div className='flex flex-col bg-cardOverlay backdrop-blur-sm items-start justify-start gap-16 w-screen h-screen overflow-y-hidden z-50 overflow-hidden'>
      <motion.div className='flex items-center justify-between w-screen h-24 px-10'>
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className='relative flex items-center justify-center text-textColor'
          onClick={() => setShowCart((prev) => !prev)}
        >
          <MdShoppingBasket className='text-4xl cursor-pointer' />
          {cartItems && (
            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-sm text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className="relative flex items-center justify-center text-textColor"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MdOutlineRestaurantMenu className="text-headingColor text-4xl" />
        </motion.div>
      </motion.div>
        
        <div className='flex items-center justify-center w-full h-72 gap-10 flex-col'>
          <Link to={'/menu'} onClick={() => setIsOpen(!isOpen)}>
            Menu
          </Link>
          <Link to={'/services'} onClick={() => setIsOpen(!isOpen)}>
            Services
          </Link>
          <Link to={'/about'} onClick={() => setIsOpen(!isOpen)}>
            About
          </Link>
          <p onClick={() => setShowContactForm((prev) => !prev)} className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-10'>
            Contact
          </p>
        </div>

        <Link 
          to={'/'}
          onClick={() => setIsOpen(!isOpen)}
          className='flex items-center justify-center w-full '
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className='flex items-center gap-2 cursor-pointer'
          >
            <img src={bikeDelivery} alt="로고" className='w-16 object-cover '/>
            <p className='text-headingColor text-3xl font-bold'>hShop</p>
          </motion.div> 
        </Link>
    </div>
  );
};

export default MobileNav;