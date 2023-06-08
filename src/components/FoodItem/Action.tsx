import React from 'react';
import { motion } from 'framer-motion';
import { FoodItem } from '../../../types';
import { MdAddShoppingCart } from "react-icons/md";

const Action = ({ food }: {food: FoodItem }) => {
  return (
    <div className='flex flex-col gap-2'>
      <motion.div
        whileTap={{scale: 1.1}}
        whileHover={{scale: 1.2}}
        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-600 flex items-center justify-center cursor-pointer"
        title='Add to Cart'
      >
        <MdAddShoppingCart className="text-white md:text-xl" />
      </motion.div>
    </div>
  );
};

export default Action;