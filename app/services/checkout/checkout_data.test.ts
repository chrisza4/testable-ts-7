import * as CheckoutData from './checkout_data'
import * as ProductData from '../product/product_data'
import * as CartData from '../cart/cart_data'
import * as ProductTestHelper from '../product/product_test_helper'
import * as TestHelper from '../../test/test_helper'

describe('getCheckoutAbleCart', () => {

  beforeEach(() => {
    return TestHelper.cleanDb()
  })

  afterAll(() => TestHelper.close())

  it('Return CheckoutAble cart', async () => {
    const cart = await CartData.create()
    const product1 = await ProductData.insert(ProductTestHelper.generateMockProduct({ sku: 'product1', unitPrice: 500 }))
    const product2 = await ProductData.insert(ProductTestHelper.generateMockProduct({ sku: 'product2', unitPrice: 900 }))
    await Promise.all([
      CartData.add(cart.id, product1.id),
      CartData.add(cart.id, product1.id),
      CartData.add(cart.id, product2.id),
    ])
    const updatedCart = await CartData.getById(cart.id)
    if (!updatedCart) {
      fail()
    }

    const checkoutAbleCart = await CheckoutData.getCheckoutAbleCart(updatedCart)
    expect(checkoutAbleCart.id.equals(cart.id)).toBeTruthy()
    expect(checkoutAbleCart.items.length).toEqual(2)

    expect(checkoutAbleCart.items[0].id.equals(product1.id)).toBeTruthy()
    expect(checkoutAbleCart.items[0].quantity).toEqual(2)
    expect(checkoutAbleCart.items[0].unitPrice).toEqual(500)

    expect(checkoutAbleCart.items[1].id.equals(product2.id)).toBeTruthy()
    expect(checkoutAbleCart.items[1].quantity).toEqual(1)
    expect(checkoutAbleCart.items[1].unitPrice).toEqual(900)
  })
})
