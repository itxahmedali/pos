import { CartItem } from './cartItem.model';

export interface AppState {
  readonly carts: Array<CartItem>;
}
