import React,{ useRef,useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import SingleFoodItem from '../FoodItem';
import { FoodItem } from '../../../types';
// import Loader from '../Loader';
import NotFound from '../NotFound';

const Container = ({ 
  scrollOffset,
  className,
  col,
  items,
 }: { 
  scrollOffset:number,
  className?: string,
  col?: boolean,
  items: FoodItem[],
 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() =>{
    if(null !== containerRef.current){
      containerRef.current.scrollLeft += scrollOffset;
    }
  },[scrollOffset])

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className={`${className} w-full my-12 flex items-center ${(!items.length || col) && "justify-center"}   min-h-[200px] gap-4  px-2 ${
        !col ? "overflow-x-hidden scrollbar-hidden scroll-smooth" : "overflow-x-hidden flex-wrap"
      }`}
    >
      {items && items.map((item: FoodItem) => (
        <SingleFoodItem key={item.id} item={item} />
      ))}
      {
        items && items.length <= 0 &&  (<NotFound text="데이터를 찾지 못했습니다. "  />)
      }
    </motion.div>
  );
};

export default Container;