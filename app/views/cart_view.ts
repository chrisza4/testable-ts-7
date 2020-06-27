import { Cart } from '../services/cart/cart_type'

export type CartResponse = Cart

export function singleView (cart: Cart): CartResponse {
  return cart
}
