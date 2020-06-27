import * as ControllerHelper from './controller_helper'
import * as CartView from '../views/cart_view'
import * as CartService from '../services/cart/cart_service'

export async function post(
  // body: ControllerHelper.Body,
): Promise<CartView.CartResponse> {
  return CartService.create().then(CartView.singleView)
}

export async function addCartItem (
  body: ControllerHelper.Body,
  query: ControllerHelper.QueryString,
  params: ControllerHelper.Params
): Promise<CartView.CartResponse> {
  if (!params.cartId || !params.productId) {
    throw new ControllerHelper.ValidationError('')
  }
  const cart = await CartService.add(String(params.cartId), String(params.productId))
  if (!cart) {
    throw new ControllerHelper.NotFoundError()
  }
  return CartView.singleView(cart)
}

export async function removeCartItem (
  body: ControllerHelper.Body,
  query: ControllerHelper.QueryString,
  params: ControllerHelper.Params
): Promise<CartView.CartResponse> {
  if (!params.cartId || !params.productId) {
    throw new ControllerHelper.ValidationError('')
  }
  const cart = await CartService.remove(String(params.cartId), String(params.productId))
  if (!cart) {
    throw new ControllerHelper.NotFoundError()
  }
  return CartView.singleView(cart)
}

export const postHandler = ControllerHelper.createExpressHandler(post)
export const addItemHandler = ControllerHelper.createExpressHandler(addCartItem)
export const removeItemHandler = ControllerHelper.createExpressHandler(removeCartItem)
