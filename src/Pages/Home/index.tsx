import React from 'react';
import { ShowcaseBanner,FruitsSection } from '../../components'

const Home = () => {
  return (
    <div className='flex w-full h-auto flex-col items-center justify-center'>
      <ShowcaseBanner />
      <FruitsSection />
    </div>
  );
};

export default Home;