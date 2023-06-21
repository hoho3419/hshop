import React from 'react';
import { motion } from 'framer-motion';
import { FoodItem } from '../../../types';
import { MdAddShoppingCart,MdShoppingBasket } from "react-icons/md";
import { useRecoilState } from 'recoil';
import { cartItemsState, cartTotalState, foodItemsState, userState } from '../../store/recoilState';
import { toast } from 'react-toastify';
import { getFoodyById } from '../../utils/functions';
import { firebaseAddToCart } from '../../firebase';

const Action = ({ food }: {food: FoodItem }) => {
  const user = useRecoilState(userState)[0];
  const foodItems = useRecoilState(foodItemsState)[0];
  const [cartItems,setCartItems] = useRecoilState(cartItemsState);
  const setTotalPrice = useRecoilState(cartTotalState)[1];

  const addCartHandler = () => {
    const addToCartForm = async () =>{
      let total:number = 0;
      if(!user){
        toast.error("로그인이 된 사용자만 사용할 수 있는 기능입니다. 로그인 해주세요",{
          icon: <MdShoppingBasket className='text-2xl text-cartNumBg' />,
          toastId: "unauthorizedAddToCart",
        })
      }else{
        if(cartItems.some((item) => item['fid'] === food.id)){
          toast.error('아이템이 이미 장바구니에 있습니다.',{
            icon: <MdShoppingBasket className='text-2xl text-cartNumBg' />,
            toastId: "itemAlreadyInCart",
          });
        }else{
          const newItem = {
            id: Date.now(),
            fid: food.id,
            qty: 1,
            uid: user.uid
          };
          setCartItems((prevItems) => {
            const updatedItems = [...prevItems, newItem];
            total = updatedItems.reduce((acc, item) => {
              const foodItem = getFoodyById(foodItems, item.fid);
              if (foodItem) {
                return acc + (+item.qty * +foodItem.price);
              }
              return acc;
            }, 0);
            firebaseAddToCart(newItem);
            return updatedItems;
          });
          
          setTotalPrice(total);
          toast.success("성공적으로 추가가 완료되었습니다.😊");
        }
      }
    }
    addToCartForm()
  }

  return (
    <div className='flex flex-col gap-2'>
      <motion.div
        whileTap={{scale: 1.1}}
        whileHover={{scale: 1.2}}
        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-600 flex items-center justify-center cursor-pointer"
        title='장바구니에 추가하기'
        onClick={addCartHandler}
      >
        <MdAddShoppingCart className="text-white md:text-xl" />
      </motion.div>
    </div>
  );
};

export default Action;