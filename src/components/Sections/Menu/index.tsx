import React, { useEffect, useState } from 'react';
import { Title } from '..';
import Filters from '../../Filters';
import Container from '../../Container';
import { useRecoilState } from 'recoil';
import { foodItemsState } from '../../../store/recoilState';
import { FoodItem } from '../../../../types'
import Pagination from '../../Pagination';

const Menu = ({ title }: { title?: string }) => {
  // 아이템 filter
  const [filter, setFilter] = useState<string>('all');
  const foodItems = useRecoilState(foodItemsState)[0];
  const filterdItems = foodItems.filter((item: FoodItem) => item.category === filter);
// pagination 아이템 보여주기
  const [page,setPage] = useState<number>(1);
  const totalItemQty = filter === 'all' ? foodItems.length : filterdItems.length;
  const totalPage = Math.ceil(totalItemQty / 10);
  const itemsPerPage = 10;
  const currentITems = filter === 'all' ? foodItems : filterdItems;
  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const pageItems = currentITems.slice(startIdx, endIdx);

  useEffect(() => {
    setPage(1);
  },[filter])
  
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
        items={pageItems}
      />
      <Pagination 
        totalPage={totalPage}
        page={page}
        setPage={setPage}
      />
    </section>
  );
};

export default Menu;

