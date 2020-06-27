import { Cart } from './cart_type'
import * as CartData from './cart_data'

export async function create (): Promise<Cart> {
  return CartData.create()
}

export async function add (cartId: string, productId: string): Promise<Cart | null> {
  return CartData.add(cartId, productId)
}

export async function remove (cartId: string, productId: string): Promise<Cart| null> {
  return CartData.remove(cartId, productId)
}
