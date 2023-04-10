import { createAction, props } from '@ngrx/store';

export const addItem = createAction(
  '[Cart] Add Item',
  props<{ item: any }>());
export const addAddOn = createAction(
  '[Cart] Add AddOn',
  props<{ itemName: any; addOn: any }>()
);
export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{ itemName: string }>()
);

export const increaseQuantity = createAction(
  '[Cart] Increase Quantity',
  props<{ itemName: string }>()
);
export const resetCart = createAction('[Cart] Reset');
