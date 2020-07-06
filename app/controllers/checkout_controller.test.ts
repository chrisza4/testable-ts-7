jest.mock('../services/checkout/checkout_service')

import { mocked } from 'ts-jest/utils'
import * as MongoDb from 'mongodb'
import * as CheckoutService from '../services/checkout/checkout_service'
import * as CheckoutController from './checkout_controller'

const mockedCheckoutService = mocked(CheckoutService)

describe('getByCartId', () => {
  it('throw not found if not provide id', async () => {
    try {
      await CheckoutController.getByCartId({ }, { }, { })
      throw Error('Should not pass')
    } catch (err) {
      expect(err.name).toEqual('NotFoundError')
    }
  })

  it('throw validation error if not provide invalid format id', async () => {
    try {
      await CheckoutController.getByCartId({ }, { }, { cartId: 'cart1' })
      throw Error('Should not pass')
    } catch (err) {
      expect(err.name).toEqual('ValidationError')
    }
  })

  it('throw not found if cart is not fund', async () =>{
    const cartId = new MongoDb.ObjectId()
    mockedCheckoutService.checkoutById.mockImplementation(async (id) => {
      if (id.equals(cartId)) {
        return null
      }
      throw new Error('Invalid id passed')
    })
    try {
      await CheckoutController.getByCartId({ }, { }, { cartId: String(cartId) })
      throw Error('Should not pass')
    } catch (err) {
      expect(err.name).toEqual('NotFoundError')
    }
  })

  it('return checkout json', async () =>{
    const cartId = new MongoDb.ObjectId()
    mockedCheckoutService.checkoutById.mockImplementation(async (id) => {
      if (id.equals(cartId)) {
        return 500
      }
      throw new Error('Invalid id passed')
    })
    const respoonse = await CheckoutController.getByCartId({ }, { }, { cartId: String(cartId) })
    expect(respoonse.totalPrice).toEqual(500)
  })
})
