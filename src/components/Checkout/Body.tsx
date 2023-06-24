import React,{ useState } from 'react';
import Selector from './Selector';
import CardForm from './form/Card';
import { motion } from 'framer-motion'
import CheckoutFooter from './Footer';
import { BiLock } from "react-icons/bi";
import { ImSpinner3 } from "react-icons/im";
import { useRecoilState } from 'recoil';
import { cartItemsState, cartTotalState } from '../../store/recoilState';
import { toast } from 'react-toastify';
import { emptyCart } from '../../utils/functions';

const Body = ({ action }: { action: any }) => {
  const [loading,setLoading] = useState(false);
  const [totalPrice,setTotalPrice] = useRecoilState(cartTotalState);
  const [cartItems,setCartItems] = useRecoilState(cartItemsState);

  const completePayment = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      await emptyCart(cartItems,setTotalPrice,setCartItems);
      toast.success("결제가 완료되었습니다. 이용해주셔서 감사합니다.", {
        position: "top-center",
        autoClose: 6000,
      });
      action(false);
    }, 3000);
  };

  return (
    <div className='w-full h-full rounded-t-[2rem] bg-cartBg flex flex-col'>
      {/* 결제방법 선택 */}
      <Selector />
      {/* 결제 신청 Form */}
      <div className='min-h-[50vh] mt-5'>
        <CardForm />
        <div className='w-full flex items-center justify-center my-2'>
          <p className='text-gray-300'>
            결제 금액: 
            <span className='font-bold text-white'>{`₩ ${totalPrice.toLocaleString('ko-KR')} 원`}</span>
          </p>
        </div>

        {/* 결제 버튼 */}
        <div className='w-full flex items-center justify-center mt-4'>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={completePayment}
            className="flex items-center justify-center gap-2 w-[90%] p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 hover:from-orange-600 hover:to-orange-400 transition-all duration-75 ease-in-out text-gray-50 text-lg my-2 hover:shadow-lg"
          >
            {!loading && <BiLock className="" />}
            {!loading ? (
              "결제하기"
            ) : (
              <ImSpinner3 className="animate animate-spin" />
            )}
          </motion.button>
        </div>
      </div>
      <CheckoutFooter />
    </div>
  );
};

export default Body;