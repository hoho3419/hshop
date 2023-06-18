import { atom } from 'recoil';
import { fetchSessionUser } from '../utils/fetchSessionData';
// 유저 로그인 정보
export const userState = atom({
  key: 'userState',
  default: fetchSessionUser(),
});
// Menu 정보들
export const foodItemsState = atom({
  key: 'foodItemsState',
  default: [],
});
// Cart 컴포넌트 보여주는 상태
export const showCartState = atom({
  key: 'showCartState',
  default: false,
});
// 장바구니 품목
export const cartItemsState = atom({
  key: 'cartItemsState',
  default: [],
});
// 장바구니 음식 가격 총 합계
export const cartTotalState = atom({
  key: 'cartTotalState',
  default: 0,
});
// 유저 정보들
export const usersState = atom({
  key: 'usersState',
  default: [],
});
// 결제 상태
export const paymentMethodState = atom({
  key: 'paymentMethodState',
  default: 'mobile_money',
});

export const checkoutDataState = atom({
  key: 'checkoutDataState',
  default: {},
});
// Contact 컴포넌트 보여주기 상태
export const showContactFormState = atom({
  key: 'showContactFormState',
  default: false,
});
