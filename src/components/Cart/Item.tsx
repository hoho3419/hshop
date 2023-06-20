import React,{useEffect} from 'react';
import { BiMinus, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { motion } from 'framer-motion';
import { cartItem } from '../../../types';
import { useRecoilState } from 'recoil';
import { cartItemsState,cartTotalState,foodItemsState } from '../../store/recoilState';
import { getFoodyById } from '../../utils/functions';
import { firebaseDeleteCartItem, firebaseUpdateCartItem } from '../../firebase';


const CartItem = ({ item } : { item: cartItem }) => {
  let price:number = 0;
  const foodItems = useRecoilState(foodItemsState)[0];
  const [cartItems,setCartItems] = useRecoilState(cartItemsState);
  const setTotalPrice = useRecoilState(cartTotalState)[1];
  const { id, fid, qty } = item;
  const foodItem = getFoodyById(foodItems, fid);

  if(foodItem){
    price = +foodItem?.price;
  }

  const deleteCartItemHandler = async () => {
    try {
      await firebaseDeleteCartItem(item);
      const newItems = cartItems.filter((cartItem) => cartItem.id !== id);
      setCartItems([...newItems]);
    } catch (error: any) {
      console.log(error);
    }
  };
  
  const updateCartItemQtyHandler = async (val:number) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if(index !== -1){
      setCartItems((prevItems) => {
        const newItems = prevItems.map((el) => {
          if (el.id === item.id) {
            return { ...el, qty: el.qty + val };
          }
          return el;
        });
        firebaseUpdateCartItem(newItems[index])
          .then(() => {
            console.log('Firebase 업데이트 성공');
          })
          .catch((error) => {
            console.log(error);
          });
        return newItems;
      });
    }
  }

  const calculateCartTotal = () => {
    const total: number = cartItems.reduce((acc,cartItem) => {
      const cartFoodItem = getFoodyById(foodItems, cartItem.fid);
      if (cartFoodItem) {
        return acc + (+cartItem.qty * +cartFoodItem.price);
      }
      return acc;
    },0);
    setTotalPrice(total);
  }
  
  useEffect(() => {
    calculateCartTotal();
  },[cartItems])

  return (
    <div className='w-full p-1 px-2 rounded-lg bg-cartItem hover:shadow-md flex items-center justify-between gap-2 cursor-pointer'>
      <div className='flex items-center gap-2'>
        <img 
          src={foodItem?.imageURL} 
          alt="상품 사진"
          className='w-20 h-20 max-w-[60px] rounded-full object-contain'
        />

        <div className='flex flex-col gap-0'>
          <p className='text-base text-gray-50'>{foodItem?.title}</p>
          <p className='text-sm block text-gray-300 font-semibold'>
            <span className='text-xs text-red-600'>₩</span> {price.toLocaleString("ko-KR")}
          </p>
        </div>
      </div>

      <div className='group flex items-center gap-2 cursor-pointer'>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={qty > 1 ? () => updateCartItemQtyHandler(-1) : () => {}}
        >
          <BiMinus className='text-gray-50' />
        </motion.div>
        <p className='text-sm text-gray-50 w-5 h-5 rounded-sm bg-cartBg flex items-center justify-center cursor-default'>
          {qty}
        </p>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateCartItemQtyHandler(1)}
        >
          <BiPlus className='text-gray-50' />
        </motion.div>
      </div>

      <motion.div
        whileTap={{ scale: 0.75 }}
        className='text-sm text-gray-50 w-6 h-6 rounded-lg bg-cartNumBg flex items-center justify-center'
        onClick={deleteCartItemHandler}
      >
        <MdDelete />
      </motion.div>
    </div>
  );
};

export default CartItem;