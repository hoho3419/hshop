import { FoodItem,cartItem } from "../../types";
import { firebaseEmptyUserCart } from "../firebase";

export const getFoodyById = (menu: FoodItem[], fid: number) => {
  return menu.find((item: FoodItem) => item.id === fid);
};

export const shuffleItems = (items: any) => {
  let currentIndex = items.length;
  let randomIndex;

  // 모든 요소를 섞을때 동안 동작한다.
  while (currentIndex !== 0) {
    // 랜덤으로 currentIndex 범위에 있는 아이템 인덱스를 랜덤하게 반환한다.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // 비구조화 할당으로 요소를 교환한다.
    [items[currentIndex], items[randomIndex]] = [
      items[randomIndex],
      items[currentIndex],
    ];
  }

  return items;
};

export const emptyCart = async (
  cartItem: cartItem[],
  setTotalPrice: any,
  setCartItems: any
  ) => {
  if(cartItem.length > 0){
    await firebaseEmptyUserCart(cartItem)
    .then(() => {
      setTotalPrice(0);
      setCartItems([]);
    })
    .catch((error) =>{
      console.log(error);
    });

  }
}