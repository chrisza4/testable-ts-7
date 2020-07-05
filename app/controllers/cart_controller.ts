import * as Joi from '@hapi/joi'
import * as ControllerHelper from './controller_helper'
import * as CartView from '../views/cart_view'
import * as CartService from '../services/cart/cart_service'
import * as ValidationHelper from '../helpers/validation_helper'
import { MongoIdParams } from '../services/types'

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
  const request = validateCartItemParams(params)
  const cart = await CartService.add(request.cartId, request.productId)
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
  const request = validateCartItemParams(params)
  const cart = await CartService.remove(request.cartId, request.productId)
  if (!cart) {
    throw new ControllerHelper.NotFoundError()
  }
  return CartView.singleView(cart)
}

type CartItemParams = {
  cartId: MongoIdParams;
  productId: MongoIdParams;
}

function validateCartItemParams (params: ControllerHelper.Params): CartItemParams {
  const schema = Joi.object().keys({
    cartId: ValidationHelper.JoiObjectId.required(),
    productId: ValidationHelper.JoiObjectId.required(),
  })
  const validationResult = schema.validate(params)
  if (validationResult.error) {
    throw new ControllerHelper.ValidationError(validationResult.error.message)
  }
  return validationResult.value as CartItemParams
}

export const postHandler = ControllerHelper.createExpressHandler(post)
export const addItemHandler = ControllerHelper.createExpressHandler(addCartItem)
export const removeItemHandler = ControllerHelper.createExpressHandler(removeCartItem)
