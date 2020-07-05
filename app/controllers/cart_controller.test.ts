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
    const expectedProductId = new MongoDb.ObjectId('5f01448ae775d00599e5871c')
    const expectedCartId = new MongoDb.ObjectId('5f01442ee775d00599e5871b')

    const cart = CartTestHelper.generateMockCart({
      items: [
        { productId: expectedProductId, quantity: 1 }
      ]
    })
    const mockCartService = mocked(CartService)
    mockCartService.add.mockImplementation(async (cartId, productId) => {
      if (!cartId.equals(expectedCartId) && productId.equals(expectedProductId)) {
        throw new Error('Invalid call')
      }
      return cart
    })
    const response = await CartController.addCartItem({ }, { },
      {
        cartId: String(expectedCartId),
        productId: String(expectedProductId)
      }
    )
    expect(response).toEqual(cart)
  })

  it('throw notfoundError when cart not found', async () => {
    const mockCartService = mocked(CartService)
    const randomProductId = new MongoDb.ObjectId()
    const randomCartId =  new MongoDb.ObjectId()
    mockCartService.add.mockResolvedValue(null)
    try {
      await CartController.addCartItem({ }, { },
        {
          cartId: String(randomCartId),
          productId: String(randomProductId)
        }
      )
      throw new Error('Should not pass')
    } catch (err) {
      expect(err.name).toEqual('NotFoundError')
    }
  })
})

describe('removeCartItem', () => {
  it('Remove from cart correctly', async () => {
    const expectedProductId = new MongoDb.ObjectId('5f014602a5a1d40898edde09')
    const expectedCartId = new MongoDb.ObjectId('5f014609a5a1d40898edde0a')
    const cart = CartTestHelper.generateMockCart({
      items: [
        { productId: expectedProductId, quantity: 1 }
      ]
    })
    const mockCartService = mocked(CartService)
    mockCartService.remove.mockImplementation(async (cartId, productId) => {
      if (!(cartId.equals(expectedCartId) && productId.equals(expectedProductId))) {
        throw new Error('Invalid call')
      }
      return cart
    })
    const response = await CartController.removeCartItem({ }, { }, {
      cartId: String(expectedCartId),
      productId: String(expectedProductId)
    })
    expect(response).toEqual(cart)
  })

  it('throw notfoundError when cart not found', async () => {
    const mockCartService = mocked(CartService)
    const productId = new MongoDb.ObjectId()
    const cartId = new MongoDb.ObjectId()

    mockCartService.remove.mockResolvedValue(null)
    try {
      await CartController.removeCartItem({ }, { }, {
        cartId: String(cartId),
        productId: String(productId)
      })
      throw new Error('Should not pass')
    } catch (err) {
      expect(err.name).toEqual('NotFoundError')
    }
  })
})
