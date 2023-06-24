import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import Navigations from './Navigations';
import MobileNav from './MobileNav';
import { Avatar, bikeDelivery } from '../Assets'
import LoginAction from './LoginAction';
import { useRecoilState } from 'recoil';
import { userState } from '../../store/recoilState';
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { RiArrowDropDownLine } from "react-icons/ri";
import DropDown from './DropDown';

const Header = () => {
  const user = useRecoilState(userState)[0];
  const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='w-screen fixed z-50 bg-cardOverlay backdrop-blur-md md:p-3 md:px-4 lg:p-6 lg:px-16' >
      {/* 태블릿 and 데스크탑 */}
      <div className="hidden md:flex w-full justify-between itesm-center">
        <Link to={'/'}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className='flex items-center gap-2 cursor-pointer'
          >
            <img src={bikeDelivery} alt="Logo" className="md:w-6 lg:w-8 object-cover" />
            <p className="text-headingColor md:text-lg lg:text-xl font-bold">
              Hshop
            </p>
          </motion.div>
        </Link>
        {/* Header Menu */}
        <Navigations />

        {/* User */}
        {user ? (
          <div className={`group flex items-center gap-3 px-3 py-1 rounded-lg`}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className='flex items-center justify-center'
            >
              <img
                src={user.photoURL || Avatar}
                alt="profile"
                className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-full cursor-pointer object-contain"
              />
              <p className="text-headingColor cursor-pointer flex items-center justify-center gap-2">
                <RiArrowDropDownLine />
              </p>
            </motion.div>
            <DropDown />
          </div>
        ) : (
          <LoginAction text='Login' />
        )}
      </div>

      {/* 모바일(작은 화면) */}
      <motion.div
        className='md:hidden flex w-full p-0 items-center justify-between'
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
      >
        {isOpenMobileNav ? (
          <MobileNav isOpen={isOpenMobileNav} setIsOpen={setIsOpenMobileNav} />
        ) : (
          <div className='p-5 flex items-center justify-between w-full'>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className='flex items-center justify-center'
              onClick={() => setIsOpenMobileNav(!isOpenMobileNav)}
            >
              <HiOutlineMenuAlt2 className='text-headingColor text-4xl' />
            </motion.div>
            <Link to={'/'}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className='flex items-center gap-2 cursor-pointer '
              >
                <img src={bikeDelivery} alt="로고" className="w-8 object-cover"/>
                <p className='text-headingColor text-xl font-bold'>hShop</p>
              </motion.div>
            </Link>
            {user ? (
              <div className='flex items-center gap-3 px-3 py-1 rounded-lg relative'>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className='group flex items-center justify-center:'
                >
                  <img
                    src={user?.photoURL ? user.photoURL : Avatar}
                    alt="유저 프로필"
                    className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl rounded-t-full cursor-pointer'
                    onClick={() => setIsOpen(!isOpen)}
                  />
                  <div className="text-headingColor cursor-pointer flex items-center justify-center gap-2">
                    <RiArrowDropDownLine />
                    {isOpen && <DropDown />}
                  </div>
                </motion.div>
              </div>
            ) : (
              <LoginAction />
            )}
          </div>

        )}
      </motion.div>
    </header>
  );
};

export default Header;