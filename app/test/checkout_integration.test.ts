import * as Supertest from 'supertest'
import App from '../server'
import * as ProductData from '../services/product/product_data'
import * as ProductTestHelper from '../services/product/product_test_helper'
import * as CartData from '../services/cart/cart_data'
import * as TestHelper from './test_helper'


TestHelper.testWithDb('/checkout', () => {
  it('Can checkout', async () => {
    const cart = await CartData.create()
    const product1 = await ProductData.insert(ProductTestHelper.generateMockProduct({ sku: 'product1', unitPrice: 500 }))
    const product2 = await ProductData.insert(ProductTestHelper.generateMockProduct({ sku: 'product2', unitPrice: 900 }))
    await Promise.all([
      CartData.add(cart.id, product1.id),
      CartData.add(cart.id, product1.id),
      CartData.add(cart.id, product2.id),
    ])

    const response = await Supertest(App).get(`/checkout/${String(cart.id)}`)

    expect(response.status).toEqual(200)
    expect(response.body.totalPrice).toEqual(1900)
  })
})
