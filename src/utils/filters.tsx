import { useRecoilState } from 'recoil';
import { foodItemsState } from "../store/recoilState";
import { FoodItem } from '../../types'

export const FilterFood = (category:string) => {
  const foodItems = useRecoilState(foodItemsState)[0];
  return foodItems?.filter((item:FoodItem) => item.category.toLowerCase() === category.toLowerCase())
}
