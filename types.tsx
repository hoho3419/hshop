export type foodItemStatic = {
  id: string,
  title: string,
  desc: string,
  price: string,
  imgSrc: string,
};
export type foodItemsStatic = {
  items: foodItemStatic[];
}

export type FoodItem = {
  id: string,
  title: string,
  description?: string,
  price: string,
  imageURL: string,
  calories: string,
  qty:string,
  category: string,
};
export type FoodItems = {
  items: FoodItem[]
};