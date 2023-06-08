import React,{ useState } from 'react';
import { Title,PrevNext as PrevNextButtons } from '../'
import Container from '../../Container';
import { Strawberry } from '../../Assets';

const fruit = [
  {
    id: 'f1',
    title: "딸기",
    description: "딸기",
    price: "딸기",
    imageURL: Strawberry,
    calories: "딸기",
    qty:"딸기",
    category: "딸기",
  },
  {
    id: 'f2',
    title: "딸기",
    description: "딸기",
    price: "딸기",
    imageURL: Strawberry,
    calories: "딸기",
    qty:"딸기",
    category: "딸기",
  },
  {
    id: 'f3',
    title: "딸기",
    description: "딸기",
    price: "딸기",
    imageURL: Strawberry,
    calories: "딸기",
    qty:"딸기",
    category: "딸기",
  },
  {
    id: 'f4',
    title: "딸기",
    description: "딸기",
    price: "딸기",
    imageURL: Strawberry,
    calories: "딸기",
    qty:"딸기",
    category: "딸기",
  },
  {
    id: 'f5',
    title: "딸기",
    description: "딸기",
    price: "딸기",
    imageURL: Strawberry,
    calories: "딸기",
    qty:"딸기",
    category: "딸기",
  },
  {
    id: 'f6',
    title: "딸기",
    description: "딸기",
    price: "딸기",
    imageURL: Strawberry,
    calories: "딸기",
    qty:"딸기",
    category: "딸기",
  },
  {
    id: 'f7',
    title: "딸기",
    description: "딸기",
    price: "딸기",
    imageURL: Strawberry,
    calories: "딸기",
    qty:"딸기",
    category: "딸기",
  },
  {
    id: 'f8',
    title: "딸기",
    description: "딸기",
    price: "딸기",
    imageURL: Strawberry,
    calories: "딸기",
    qty:"딸기",
    category: "딸기",
  },
];

const Fruits = () => {
  // const fruits = 
  const [scrollValue,setScrollValue] = useState(0);
  return (
    <section className='w-full my-5'>
      <div className='w-full flex items-center justify-between'>
        <Title title='Our fresh & healthy fruits'/>
        <PrevNextButtons onNext={() => setScrollValue(10000)} onPrev={() => setScrollValue(-10000)}/>
      </div>
      <Container className="bg-containerbg" scrollOffset = {scrollValue} items={fruit} />
    </section>
  );
};

export default Fruits;