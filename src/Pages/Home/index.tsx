import React from 'react';
import { ShowcaseBanner,FruitsSection,MenuSection } from '../../components'

const Home = () => {
  return (
    <div className='flex w-full h-auto flex-col items-center justify-center'>
      <ShowcaseBanner />
      <FruitsSection />
      <MenuSection />
    </div>
  );
};

export default Home;