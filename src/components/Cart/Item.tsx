import React from 'react';
import { BiMinus, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { motion } from 'framer-motion';
import { cartItem,FoodItem } from '../../../types';
import { useRecoilState } from 'recoil';
import { cartItemsState,foodItemsState } from '../../store/recoilState';
import { getFoodyById } from '../../utils/functions';


const CartItem = ({ item } : { item: cartItem }) => {
  const foodItems = useRecoilState(foodItemsState)[0];
  const cartItems = useRecoilState(cartItemsState)[0];
  const { id, fid, qty } = item;

  const foodItem = getFoodyById(foodItems, fid);

  return (
    <div className='w-full p-1 px-2 rounded-lg bg-cartItem hover:shadow-md flex flex-col items-center justify-between gap-2 cursor-pointer'>
      <div className='flex items-center gap-2'>
        <img 
          src={foodItem?.imageURL} 
          alt="상품 사진"
          className='w-20 h-20 max-w-[60px] rounded-full object-contain'
        />

        <div className='flex flex-col gap-0'>
          <p className='text-base text-gra'>{foodItem?.title}</p>
          <p className='text-sm block text-gray-300 font-semibold'>
            <span className='text-xs text-red-600'>₩</span> {foodItem?.price}
          </p>
        </div>
      </div>

      <div className='group flex items-center gap-2 cursor-pointer'>
        <motion.div
          whileTap={{ scale: 0.75 }}
        >
          <BiMinus className='text-gray-50' />
        </motion.div>
        <p className='text-sm text-gray-50 w-5 h-5 rounded-sm bg-cartBg flex items-center justify-center cursor-default'>
          {qty}
        </p>
        <motion.div
          whileTap={{ scale: 0.75 }}
        >
          <BiPlus className='text-gray-50' />
        </motion.div>
      </div>

      <motion.div
        whileTap={{ scale: 0.75 }}
        className='text-sm text-gray-50 w-6 h-6 rounded-lg bg-cartNumBg flex items-center justify-center'
      >
        <MdDelete />
      </motion.div>
    </div>
  );
};

export default CartItem;