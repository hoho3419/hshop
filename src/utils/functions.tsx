import { toast } from "react-toastify";
import { FoodItem,cartItem } from "../../types";
import { firebaseEmptyUserCart, firebaseFetchAllCartItems, firebaseUpdateUser } from "../firebase";
// foodItem 반환
export const getFoodyById = (menu: FoodItem[], fid: number) => {
  return menu.find((item: FoodItem) => item.id === fid);
};
// 아이템 섞어서 반환하기
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
// 장바구니 비우기 
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
// 현재 유저 데이터 변경하기
export const updateUserData = async (
  setUser: any,
  newUser: any
  ) => {
  await firebaseUpdateUser(newUser)
    .then(() => {
      setUser(newUser);
    }).catch((error) => {
      console.log(error);
    })
    .then(() => {
      localStorage.setItem('user',JSON.stringify(newUser));
      toast.success("데이터가 정상적으로 변경되었습니다.");
    })
}

export const userCartItemsUpdate = (
  uid: string,
  items: cartItem[],
  setItems: any
) => {
  const cartItems = items.filter((item: cartItem) => item.uid === uid);
  setItems(cartItems);
  return cartItems;
}

export const fetchUserCartData = async (user: any, setCartItems: any) => {
  if (user) {
    await firebaseFetchAllCartItems()
      .then((data) => {
        const userCart = userCartItemsUpdate(user.uid, data, setCartItems);
        localStorage.setItem("cartItems", JSON.stringify(userCart));
      })
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  } else {
    localStorage.setItem("cartItems", "undefined");
  }
};