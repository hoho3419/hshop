import React from 'react';
import { MdOutlineKeyboardBackspace, MdOutlineMessage } from "react-icons/md";
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { showContactFormState } from '../../store/recoilState';

const ContactHeader = () => {
  const setShowContactForm = useRecoilState(showContactFormState)[1];

  return (
    <div className='w-full flex flex-row-reverse items-center bg-white justify-between px-4 py-2 cursor-pointer'>
      <motion.div
        whileTap={{ scale: 0.8 }}
        onClick={() => setShowContactForm(false)}
      >
        <MdOutlineKeyboardBackspace className='text-textColor text-2xl' />
      </motion.div>

      <motion.div
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 0.9 }}
        className='flex items-center justify-center gap-x-2 px-2'
      >
        <MdOutlineMessage className='text-xl cursor-pointer text-orange-600' />
        <span>CONTACT ME</span>
      </motion.div>
    </div>
  );
};

export default ContactHeader;