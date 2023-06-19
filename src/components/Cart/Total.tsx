import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { cartTotalState } from '../../store/recoilState';

const CartTotal = ({checkoutState}: {checkoutState:any}) => {
  const cartTotal = useRecoilState(cartTotalState)[0];

  return (
    <div className='w-full mt-2 md:mt-0 flex-1 rounded bg-cartItem rounded-t-[2rem] px-8 py-2 flex flex-col items-center justify-evenly'>
        <div className="w-full flex items-center justify-between">
          <p className="text-gray-400 text-base md:text-lg ">가격</p>
          <p className="text-gray-400 text-base md:text-lg">-</p>
          <p className="text-gray-400 text-base md:text-lg "><span className="text-sm text-red-600">₩</span> {cartTotal.toLocaleString("ko-KR")} 원</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-gray-400 text-base md:text-lg ">배달료</p>
          <p className="text-gray-400 text-base md:text-lg">-</p>
          <p className="text-gray-400 text-base md:text-lg "><span className="text-sm text-red-600">₩</span> {0} 원</p>
        </div>
        <div className="w-full border-b border-gray-600 my-"></div>
        <div className="w-full flex items-center justify-between">
        <p className="text-gray-50 text-base md:text-lg uppercase">총 가격</p>
        <p className="text-gray-50 text-base md:text-lg">-</p>
          <p className="text-gray-50 text-base md:text-lg "><span className="text-sm text-red-600">₩</span> {cartTotal.toLocaleString("ko-KR")} 원</p>
        </div>
        <motion.button onClick = {() => checkoutState(true)} whileTap={{scale:0.8}} className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg'>
          결제 ₩ {cartTotal.toLocaleString("ko-KR")} 원
        </motion.button>

    </div>
  )
}

export default CartTotal