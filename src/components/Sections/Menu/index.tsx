import React, { useState } from 'react';
import { Title } from '..';
import Filters from '../../Filters';
import Container from '../../Container';
import { useRecoilState } from 'recoil';
import { foodItemsState } from '../../../store/recoilState';
import { FoodItem } from '../../../../types'

const Menu = ({ title }: { title?: string }) => {
  const [filter, setFilter] = useState<string>('all');
  const foodItems = useRecoilState(foodItemsState)[0];

  const filterdItems = foodItems.filter((item: FoodItem) => item.category === filter);

  return (
    <section className='w-full my-5' id='menu'>
      <div className='w-full flex items-center justify-center'>
        <Title title={title || "Our Hot Dishes"} center />
      </div>
      <Filters Filter={filter} setFilter={setFilter} />
      <Container
        className='bg-containerbg'
        col
        scrollOffset={0}
        items={filter === 'all' ? foodItems : filterdItems}
        />
    </section>
  );
};

export default Menu;

