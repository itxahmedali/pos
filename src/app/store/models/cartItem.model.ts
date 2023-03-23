export interface CartItem {
  name: any;
  value:number;
  addOns:any;
}
interface CartState {
  items: CartItem[];
}
export const initialState: CartState = {
  items: []
};
