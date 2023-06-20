import { atom } from 'recoil';
import { fetchSessionUser,fetchSessionCart } from '../utils/fetchSessionData';
import { cartItem } from '../../types'

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
export const showCartState = atom<boolean>({
  key: 'showCartState',
  default: false,
});
// 장바구니 품목
export const cartItemsState = atom<cartItem[]>({
  key: 'cartItemsState',
  default: fetchSessionCart(),
});
// 장바구니 음식 가격 총 합계
export const cartTotalState = atom<number>({
  key: 'cartTotalState',
  default: 0,
});
// 결제 상태
export const paymentMethodState = atom({
  key: 'paymentMethodState',
  default: 'mobile_money',
});
// 결제정보 데이터 상태
export const checkoutDataState = atom({
  key: 'checkoutDataState',
  default: {},
});
// Contact 컴포넌트 보여주기 상태
export const showContactFormState = atom<boolean>({
  key: 'showContactFormState',
  default: false,
});
