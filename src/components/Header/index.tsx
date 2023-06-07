import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import Navigations from './Navigations';
import { Avatar } from '../Assets'
import LoginAction from './LoginAction';

const Header = () => {
  return (
    <header className='w-screen fixed bg-cardOverlay backdrop-blur-md md:p-3 md:px-4 lg:p-6 lg:px-16' >
      {/* 태블릿 and 데스크탑 */}
      <div className="hidden md:flex w-full justify-between itesm-center">
        <Link to={'/'}>
          <motion.div
            whileHover={{scale: 1.1}}
            className='flex items-center gap-2 cursor-pointer'
          >
            <p className="text-headingColor md:text-lg lg:text-xl font-bold">
                Hshop
            </p>
          </motion.div>
        </Link>
        {/* Header Menu */}
        <Navigations />

        {/* User 로그인 안되어 있으면 LoginAction*/} 
        <LoginAction text='Login'/>
        {/* <div className={`group flex items-center gap-3 px-3 py-1 rounded-lg`}>
          <motion.div
            whileHover={{scale: 1.1}}
            className='flex items-center justify-center'
          >
            <img 
              src={Avatar} 
              alt="profile" 
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer object-contain"
              />
          </motion.div>
        </div> */}

      </div>
    </header>
  );
};

export default Header;