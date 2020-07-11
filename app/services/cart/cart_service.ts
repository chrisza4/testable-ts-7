import { Cart } from './cart_type'
import * as CartData from './cart_data'
import * as CartDomain from './cart_domain'
import { MongoIdParams } from '../types'

export async function create (): Promise<Cart> {
  return CartData.create()
}

export async function add (cartId: MongoIdParams, productId: MongoIdParams): Promise<Cart | null> {
  const cart = await CartData.getById(cartId)
  if (!cart) {
    return null
  }
  if (!CartDomain.canAdd(cart)) {
    return null
  }
  return CartData.add(cartId, productId)
}

export async function remove (cartId: MongoIdParams, productId: MongoIdParams): Promise<Cart| null> {
  return CartData.remove(cartId, productId)
}
