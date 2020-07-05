import { Cart } from './cart_type'
import * as CartData from './cart_data'
import { MongoIdParams } from '../types'

export async function create (): Promise<Cart> {
  return CartData.create()
}

export async function add (cartId: MongoIdParams, productId: MongoIdParams): Promise<Cart | null> {
  return CartData.add(cartId, productId)
}

export async function remove (cartId: MongoIdParams, productId: MongoIdParams): Promise<Cart| null> {
  return CartData.remove(cartId, productId)
}
