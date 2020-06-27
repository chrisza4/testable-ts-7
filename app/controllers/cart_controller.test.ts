jest.mock('../services/cart/cart_service.ts')
import * as MongoDb from 'mongodb'
import { mocked } from 'ts-jest/utils'
import * as CartService from '../services/cart/cart_service'
import * as CartController from './cart_controller'
import * as CartTestHelper from '../services/cart/cart_test_helper'

describe('post', () => {
  it('generate cart from service layer', async () => {
    const cart = CartTestHelper.generateMockCart({ })
    mocked(CartService).create.mockResolvedValue(cart)
    const response = await CartController.post()
    expect(response).toEqual(cart)
  })
})

describe('addCartItem', () => {
  it('Add to cart correctly', async () => {
    const productId = new MongoDb.ObjectId()
    const cart = CartTestHelper.generateMockCart({
      items: [
        { productId, quantity: 1 }
      ]
    })
    const mockCartService = mocked(CartService)
    mockCartService.add.mockImplementation(async (cartId, productId) => {
      if (cartId !== 'cart1' && productId !== String(productId)) {
        throw new Error('Invalid call')
      }
      return cart
    })
    const response = await CartController.addCartItem({ }, { }, { cartId: 'cart1', productId: String(productId) })
    expect(response).toEqual(cart)
  })

  it('throw notfoundError when cart not found', async () => {
    const mockCartService = mocked(CartService)
    mockCartService.add.mockResolvedValue(null)
    try {
      await CartController.addCartItem({ }, { }, { cartId: 'cart1', productId: 'p1' })
      throw new Error('Should not pass')
    } catch (err) {
      expect(err.name).toEqual('NotFoundError')
    }
  })
})

describe('removeCartItem', () => {
  it('Remove from cart correctly', async () => {
    const productId = new MongoDb.ObjectId()
    const cart = CartTestHelper.generateMockCart({
      items: [
        { productId, quantity: 1 }
      ]
    })
    const mockCartService = mocked(CartService)
    mockCartService.remove.mockImplementation(async (cartId, productId) => {
      if (cartId !== 'cart1' && productId !== String(productId)) {
        throw new Error('Invalid call')
      }
      return cart
    })
    const response = await CartController.removeCartItem({ }, { }, { cartId: 'cart1', productId: String(productId) })
    expect(response).toEqual(cart)
  })

  it('throw notfoundError when cart not found', async () => {
    const mockCartService = mocked(CartService)
    mockCartService.remove.mockResolvedValue(null)
    try {
      await CartController.removeCartItem({ }, { }, { cartId: 'cart1', productId: 'p1' })
      throw new Error('Should not pass')
    } catch (err) {
      expect(err.name).toEqual('NotFoundError')
    }
  })
})
