import React from 'react';
import { HeroBg } from '../Assets';
import StaticsImages from './Statics';
import { staticData } from '../../utils/showcaseStatic'

const Right = () => {
  return (
    <div className="py-2 flex-1 flex items-center relative">
      <img 
        src={HeroBg} 
        alt="배경사진" 
        className='ml-auto lg:h-[550px] h-[420px] w-full lg:w-auto'
        />
        <StaticsImages items={staticData}/>
    </div>
  );
};

export default Right;