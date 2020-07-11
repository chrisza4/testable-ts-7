import * as CartDomain from './cart_domain'
import * as CartTestHelper from './cart_test_helper'

describe('canAdd', () => {
  it('can add product into cart if cart is not older than 3 months', () => {
    const now = new Date('2019-04-01')
    const threeMonthsAgo = new Date('2019-01-01')
    const cart = CartTestHelper.generateMockCart({
      created: threeMonthsAgo
    })
    const allowAdd = CartDomain.canAdd(cart, now)
    expect(allowAdd).toBeTruthy()
  })

  it('cannot add product into cart if cart is older than 3 months', () => {
    const now = new Date('2019-04-01')
    const created = new Date('2018-12-31')
    const cart = CartTestHelper.generateMockCart({
      created
    })
    const allowAdd = CartDomain.canAdd(cart, now)
    expect(allowAdd).toBeFalsy()
  })
})
