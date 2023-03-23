import { createReducer, on } from '@ngrx/store';
import { addItem, removeItem, increaseQuantity, addAddOn, resetCart } from '../actions/cart.action';

export interface CartItem {
  name: string;
  quantity: number;
  addOns: any;
  details:any
}

export interface CartState {
  items: CartItem[];
}

const storedState = localStorage.getItem('cartItems');
const initialState: CartState = storedState ? JSON.parse(storedState) : {
  items: []
};

export const cartReducer = createReducer(
  initialState,
  on(addItem, (state, { item }) => {
    const existingItemIndex = state.items.findIndex(i => i.name === item.name);
    if (existingItemIndex !== -1) {
      const updatedItem = { ...state.items[existingItemIndex], quantity: state.items[existingItemIndex].quantity + 1 };
      localStorage.setItem('cartItems', JSON.stringify({ items: [...state.items.slice(0, existingItemIndex), updatedItem, ...state.items.slice(existingItemIndex + 1)] }));
      return { items: [...state.items.slice(0, existingItemIndex), updatedItem, ...state.items.slice(existingItemIndex + 1)] };
    } else {
      localStorage.setItem('cartItems', JSON.stringify({ items: [...state.items, item] }));
      return { items: [...state.items, item] };
    }
  }),
  on(removeItem, (state, { itemName }) => {
    const existingItemIndex = state.items.findIndex(i => i.name === itemName);
    if (existingItemIndex !== -1) {
      const item:any = state.items[existingItemIndex];
      if (item.quantity > 1) {
        const updatedItem = { ...item, quantity: item.quantity - 1 };
        localStorage.setItem('cartItems', JSON.stringify({ items: [...state.items.slice(0, existingItemIndex), updatedItem, ...state.items.slice(existingItemIndex + 1)] }));
        return { items: [...state.items.slice(0, existingItemIndex), updatedItem, ...state.items.slice(existingItemIndex + 1)] };
      } else {
        localStorage.setItem('cartItems', JSON.stringify({ items: [...state.items.slice(0, existingItemIndex), ...state.items.slice(existingItemIndex + 1)] }));
        return { items: [...state.items.slice(0, existingItemIndex), ...state.items.slice(existingItemIndex + 1)] };
      }
    } else {
      return state;
    }
  }),
  on(increaseQuantity, (state, { itemName }) => {
    const existingItemIndex = state.items.findIndex(i => i.name === itemName);
    if (existingItemIndex !== -1) {
      const updatedItem = { ...state.items[existingItemIndex], quantity: state.items[existingItemIndex].quantity + 1 };
      localStorage.setItem('cartItems', JSON.stringify({ items: [...state.items.slice(0, existingItemIndex), updatedItem, ...state.items.slice(existingItemIndex + 1)] }));
      return { items: [...state.items.slice(0, existingItemIndex), updatedItem, ...state.items.slice(existingItemIndex + 1)] };
    } else {
      return state;
    }
  }
  ),
  on(addAddOn, (state, { itemName, addOn }) => {
    const existingParentItemIndex = state.items.findIndex(i => i.name === itemName);
    if (existingParentItemIndex !== -1) {
      const existingAddOnIndex = state.items[existingParentItemIndex].addOns.findIndex((a:any) => a.item.name === addOn.item.name);
      if (existingAddOnIndex !== -1) {
        const updatedAddOn = { ...state.items[existingParentItemIndex].addOns[existingAddOnIndex], quantity: state.items[existingParentItemIndex].addOns[existingAddOnIndex].quantity + 1 };
        const updatedParentItem = { ...state.items[existingParentItemIndex], addOns: [...state.items[existingParentItemIndex].addOns.slice(0, existingAddOnIndex), updatedAddOn, ...state.items[existingParentItemIndex].addOns.slice(existingAddOnIndex + 1)] }
      localStorage.setItem('cartItems', JSON.stringify({ items: [...state.items.slice(0, existingParentItemIndex), updatedParentItem, ...state.items.slice(existingParentItemIndex + 1)] }));
        return { items: [...state.items.slice(0, existingParentItemIndex), updatedParentItem, ...state.items.slice(existingParentItemIndex + 1)] };
      } else {
        const updatedParentItem = { ...state.items[existingParentItemIndex], addOns: [...state.items[existingParentItemIndex].addOns, { ...addOn, quantity: 1 }] };
      localStorage.setItem('cartItems', JSON.stringify({ items: [...state.items.slice(0, existingParentItemIndex), updatedParentItem, ...state.items.slice(existingParentItemIndex + 1)] }));
        return { items: [...state.items.slice(0, existingParentItemIndex), updatedParentItem, ...state.items.slice(existingParentItemIndex + 1)] };
      }
    } else {
      return state;
    }
  }),
  on(resetCart, (state) => {
    localStorage.removeItem('cartItems');
    return { items: [] };
  })
)

