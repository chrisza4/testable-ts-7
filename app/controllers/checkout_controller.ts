import * as MongoDb from 'mongodb'
import * as Joi from '@hapi/joi'
import * as ValidationHelper from '../helpers/validation_helper'
import * as ControllerHelper from './controller_helper'
import * as CheckoutView from '../views/checkout_view'
import * as CheckoutService from '../services/checkout/checkout_service'

export async function getByCartId(
  body: ControllerHelper.Body,
  queryString: ControllerHelper.QueryString,
  params: ControllerHelper.Params
): Promise<CheckoutView.CheckoutResponse> {
  const id = params.cartId
  if (!id) {
    throw new ControllerHelper.NotFoundError()
  }
  const parsedParams = parseGetByCartIdParams(params)
  const price = await CheckoutService.checkoutById(parsedParams.cartId)
  if (price === null) {
    throw new ControllerHelper.NotFoundError()
  }
  return CheckoutView.CheckoutView(price)
}

type getCartByIdParams = {
  cartId: MongoDb.ObjectId;
}

function parseGetByCartIdParams(params: ControllerHelper.Params): getCartByIdParams {
  const schema = Joi.object().keys({
    cartId: ValidationHelper.JoiObjectId
  })
  const validationResult = schema.validate(params, { stripUnknown: true })
  if (validationResult.error) {
    throw new ControllerHelper.ValidationError(validationResult.error.message)
  }
  return validationResult.value as getCartByIdParams
}

export const getByCartIdHandler = ControllerHelper.createExpressHandler(getByCartId)
