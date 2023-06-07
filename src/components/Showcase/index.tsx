import React from 'react';
import Left from './Left';
import Right from './Right';


const Showcase = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id='home'>
      <Left />
      <Right />
    </section>
  );
};

export default Showcase;