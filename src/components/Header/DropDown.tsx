import React from 'react';
import { FaUserCog } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { motion } from 'framer-motion' ;
import { Link,useNavigate } from 'react-router-dom';
import { firebaseLogout } from '../../firebase';
import { useRecoilState } from 'recoil';
import { userState,cartItemsState } from '../../store/recoilState';

const DropDown = () => {
  const navigate = useNavigate();
  const [user,setUser] = useRecoilState(userState);
  const setCartItems = useRecoilState(cartItemsState)[1];

  const logoutHandler = async () => {
    await firebaseLogout()
    .then(() => {
      setUser(null);
      setCartItems([]);
      localStorage.setItem('user','undefined');
      localStorage.removeItem('cartItems');
      navigate('/');
    })
    .catch((err) => {
      console.log(err.message);
    })
  }

  return (
    <motion.div
      initial={{opacity: 0, scale: 0.6}}
      animate={{opacity: 1, scale: 1}}
      exit={{opacity: 0, scale: 0.6}}
      className='hidden group-hover:flex w-54 bg-gray-50 rounded-lg shadow-xl flex-col absolute right-0 top-16'
    >
      <p className="px-10 py-2 flex items-center gap-3 bg-slate-100 transition-all duration-100 capitalize ease-in-out text-base text-headingColor">
        {user?.displayName || user?.email}
      </p>
      <Link to={'/profile'}
        className='px-10 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-base text-textColor'
      >
        Profile <FaUserCog />
      </Link>
      <p
        className="cursor-pointer px-10 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-base text-textColor"
        onClick={logoutHandler}
      >
        Logout
        <MdLogout />
      </p>
    </motion.div>
  );
};

export default DropDown;