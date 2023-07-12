import React from 'react';
import { motion } from 'framer-motion'

const Pagination = ({ totalPage, page, setPage } : { totalPage : number, page: number, setPage: (number: number) => void}) => {
  const arr = [];
  for(let i = 0;i<totalPage; i++){
    arr.push(i + 1);
  }
  return (
    <div className='flex justify-center  gap-3'>
      {
        arr.map((val) => (
          <motion.span 
            key={val}
            className={`cursor-pointer text-center text-2xl ${page === val ? 'font-bold' : ' '}`}
            whileHover={{ scale: 1.1 }}
            onClick={() => setPage(val)}
          >
            {val}
          </motion.span>
        ))
      }
    </div>
  )
}

export default Pagination;