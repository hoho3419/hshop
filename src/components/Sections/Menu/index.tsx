import React, { useState } from 'react';
import { Title } from '..';
import Filters from '../../Filters';
import Container from '../../Container';
import { Strawberry } from '../../Assets';
import { FoodItem } from '../../../../types';

const data: FoodItem[] = [
  {
    id: '1',
    title: '딸기',
    description: '아주 맛있는 딸기',
    price: '3000',
    imageURL: Strawberry,
    calories: '100',
    qty: '1',
    category: 'all',
  },
  {
    id: '2',
    title: '망고',
    description: '아주 맛있는 망고',
    price: '3000',
    imageURL: Strawberry,
    calories: '100',
    qty: '1',
    category: 'all',
  },
  {
    id: '3',
    title: '수박',
    description: '아주 맛있는 수박',
    price: '3000',
    imageURL: Strawberry,
    calories: '100',
    qty: '1',
    category: 'all',
  },
  {
    id: '4',
    title: '참외',
    description: '아주 맛있는 참외',
    price: '3000',
    imageURL: Strawberry,
    calories: '100',
    qty: '1',
    category: 'all',
  },
  {
    id: '5',
    title: '메론',
    description: '아주 맛있는 메론',
    price: '3000',
    imageURL: Strawberry,
    calories: '100',
    qty: '1',
    category: 'all',
  },
  {
    id: '6',
    title: '파인애플',
    description: '아주 맛있는 파인애플',
    price: '3000',
    imageURL: Strawberry,
    calories: '100',
    qty: '1',
    category: 'all',
  },
  {
    id: '7',
    title: '체리',
    description: '아주 맛있는 체리',
    price: '3000',
    imageURL: Strawberry,
    calories: '100',
    qty: '1',
    category: 'all',
  },
  {
    id: '8',
    title: '블루베리',
    description: '아주 맛있는 블루베리',
    price: '3000',
    imageURL: Strawberry,
    calories: '100',
    qty: '1',
    category: 'all',
  },
  {
    id: '9',
    title: '토마토',
    description: '아주 맛있는 토마토',
    price: '3000',
    imageURL: Strawberry,
    calories: '100',
    qty: '1',
    category: 'all',
  },
  {
    id: '10',
    title: '바나나',
    description: '아주 맛있는 바나나',
    price: '3000',
    imageURL: Strawberry,
    calories: '100',
    qty: '1',
    category: 'all',
  },
];

const Menu = ({ title }: { title?: string }) => {
  const [filter, setFilter] = useState<string>('all');
  // const [scrollValue, setScrollValue] = useState(0);

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
        items={filter === 'all' ? data : data}
        />
    </section>
  );
};

export default Menu;

