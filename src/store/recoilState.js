import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: null,
});

export const foodItemsState = atom({
  key: 'foodItemsState',
  default: null,
});

export const showCartState = atom({
  key: 'showCartState',
  default: false,
});

export const cartItemsState = atom({
  key: 'cartItemsState',
  default: [],
});

export const cartTotalState = atom({
  key: 'cartTotalState',
  default: 0,
});

export const usersState = atom({
  key: 'usersState',
  default: [],
});

export const paymentMethodState = atom({
  key: 'paymentMethodState',
  default: 'mobile_money',
});

export const checkoutDataState = atom({
  key: 'checkoutDataState',
  default: {},
});

export const showContactFormState = atom({
  key: 'showContactFormState',
  default: false,
});
