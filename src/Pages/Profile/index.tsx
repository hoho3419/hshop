import React from 'react';
import { BiUser } from "react-icons/bi";
import { BsPhone } from "react-icons/bs";
import {
  MdOutlineDataSaverOn,
} from "react-icons/md";
import { AssetUploader } from '../../components';
import { motion } from 'framer-motion'

const Profile = () => {


  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='border w-full md:w-[60%] flex border-gray-300 items-center rounded-lg p-4 flex-col gap-4 mt-8 mg:mt-10'>
        <div className='w-full py-3 border-b border-gray-300 flex items-center gap-2'>
          <BiUser className="text-xl text-gray-600"/>
          <input 
            type="text"
            required
            placeholder='이름을 입력하세요'
            autoFocus
            className="h-full w-full  bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400"
           />
        </div>
        <div className='w-full flex flex-col md:flex-row items-center gap-3'>
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <BsPhone className='text-gray-600 text-2xl '/>
            <input type="number"
              required
              placeholder='핸드폰 번호를 입력하세요 ex)01012345678'
              className='w-full h-full bg-transparent pl-2 text-textColor outline-none border-none placeholder:text-gray-400'
            />
          </div>
        </div>
        <div className='group flex justify-center items-center flex-col border-2 border-dotted w-full border-gray-300 h-[225px] md:h-[420px] round-lg '>
          <AssetUploader />
        </div>
        <div className='w-full flex items-center justify-center'>
        <motion.button
          whileHover={{scale: 1.1}}
          className='ml-0 flex justify-center items-center gap-2 flex-row-reverse md:ml-auto w-full md:w-auto border-none outline-none rounded bg-orange-500 px-12 py-2 text-lg text-white'
        >
          <MdOutlineDataSaverOn />
        </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Profile;