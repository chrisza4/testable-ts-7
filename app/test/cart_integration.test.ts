import * as Supertest from 'supertest'
import App from '../server'
import * as ProductData from '../services/product/product_data'
import * as ProductTestHelper from '../services/product/product_test_helper'
import * as CartData from '../services/cart/cart_data'
import * as TestHelper from './test_helper'


TestHelper.testWithDb('/cart/:cartId/product/:productId', () => {
  it('Can add product to cart', async () => {
    const cart = await CartData.create()
    const product1 = await ProductData.insert(ProductTestHelper.generateMockProduct({ sku: 'product1', unitPrice: 500 }))

    const response = await Supertest(App).put(`/cart/${String(cart.id)}/product/${String(product1.id)}`)

    expect(response.status).toEqual(200)
    expect(response.body.items.length).toEqual(1)
    expect(response.body.items[0].productId).toEqual(String(product1.id))
  })

  it('Can delete product from cart', async () => {
    const cart = await CartData.create()
    const product1 = await ProductData.insert(ProductTestHelper.generateMockProduct({ sku: 'product1', unitPrice: 500 }))
    await CartData.add(cart.id, product1.id)

    const response = await Supertest(App).delete(`/cart/${String(cart.id)}/product/${String(product1.id)}`)

    expect(response.status).toEqual(200)
    expect(response.body.items.length).toEqual(0)
  })
})
