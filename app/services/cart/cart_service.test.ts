jest.mock('./cart_domain.ts')
jest.mock('./cart_data.ts')
import * as MongoDb from 'mongodb'
import { mocked } from 'ts-jest/utils'
import * as CartDomain from './cart_domain'
import * as CartData from './cart_data'
import * as CartService from './cart_service'
import * as CartTestHelper from './cart_test_helper'

const mockCartDomain = mocked(CartDomain)
const mockCartData = mocked(CartData)

describe('add', () => {
  const testCart = CartTestHelper.generateMockCart({})
  beforeEach(() => {
    mockCartData.add.mockResolvedValue(testCart)
    mockCartData.getById.mockResolvedValue(testCart)
  })

  it('should add product to cart if possible', async () => {
    mockCartDomain.canAdd.mockReturnValue(true)
    const productId = new MongoDb.ObjectId('5f0939c8ea5b9c0bcbc5ace1')
    mockCartData.add.mockResolvedValue(testCart)

    const result = await CartService.add(testCart.id, productId)

    expect(result).toEqual(testCart)
  })

  it('should return null if cart cannot be added', async () => {
    mockCartDomain.canAdd.mockReturnValue(false)
    const productId = new MongoDb.ObjectId('5f0939c8ea5b9c0bcbc5ace1')

    const result = await CartService.add(testCart.id, productId)

    expect(result).toBeNull()
  })
})
