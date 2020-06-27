import { Cart } from './cart_type'

export async function insert (cart: Cart): Promise<Cart> {
  throw new Error('Not implemented')
}

export async function add (cartId: string, productId: string): Promise<Cart> {
  throw new Error('Not implemented')
}

export async function remove (cartId: string, productId: string): Promise<Cart> {
  throw new Error('Not implemented')
}
