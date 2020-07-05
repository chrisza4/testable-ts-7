import * as MongoDb from 'mongodb'
import * as TestHelper from '../../test/test_helper'
import * as CartData from './cart_data'
import * as ProductData from '../product/product_data'
import * as ProductTestHelper from '../product/product_test_helper'
import { Cart } from './cart_type'
import { Product } from '../product/product_type'

describe('ProductData', () => {
  beforeEach(() => {
    return TestHelper.cleanDb()
  })

  afterAll(() => TestHelper.close())

  describe('insert', () => {
    it('Can insert new cart', async () => {
      const now = new Date('2019-01-01')
      const cart = await CartData.create(now)
      expect(cart.created).toEqual(now)
      expect(cart.items.length).toEqual(0)

      const savedCart = await CartData.getById(cart.id)
      expect(savedCart?.id.equals(cart.id)).toBeTruthy()
      expect(savedCart?.hash).toEqual(cart.hash)
    })
  })

  describe('getById', () => {
    it('Return null on invalid id', async () => {
      const result = await CartData.getById(new MongoDb.ObjectId())
      expect(result).toBeNull()
    })
  })

  describe('add', () => {
    let cart1: Cart
    let product1: Product
    let product2: Product

    beforeEach(async () => {
      [cart1, product1, product2] = await Promise.all([
        CartData.create(),
        ProductData.insert(ProductTestHelper.generateMockProduct({ name: 'milk' })),
        ProductData.insert(ProductTestHelper.generateMockProduct({ name: 'soy sauce'}))
      ])
    })

    it('Should be able to add product', async () => {
      await CartData.add(cart1.id, product1.id)
      await CartData.add(cart1.id, product1.id)
      await CartData.add(cart1.id, product2.id)
      const cart = await CartData.getById(cart1.id)
      if (!cart) {
        fail()
      }
      expect(cart.items.length).toEqual(2)
      const product1Item = cart.items.find(c => c.productId.equals(product1.id))
      const product2Item = cart.items.find(c => c.productId.equals(product2.id))
      expect(product1Item?.quantity).toEqual(2)
      expect(product2Item?.quantity).toEqual(1)
    })

    it('should be able to remove product', async () => {
      await CartData.add(cart1.id, product1.id)
      await CartData.add(cart1.id, product1.id)
      await CartData.add(cart1.id, product2.id)

      await CartData.remove(cart1.id, product1.id)
      await CartData.remove(cart1.id, product2.id)
      const cart = await CartData.getById(cart1.id)
      if (!cart) {
        fail()
      }
      // expect(cart.items.length).toEqual(1) // Only product 1 left
      const product1Item = cart.items.find(c => c.productId.equals(product1.id))
      expect(product1Item?.quantity).toEqual(1)
    })
  })


})
