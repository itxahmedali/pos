export interface CartState {
  orders: Order[];
}

export interface Order {
  id: string;
  items: Item[];
}

export interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
