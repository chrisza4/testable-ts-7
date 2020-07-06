import * as CheckoutDomain from './checkout_domain'
import * as CheckoutTestHelper from './checkout_test_telper'

describe('calculatePrice', () => {
  it('Can calculate normal price', () => {
    const cartToCheckout = CheckoutTestHelper.generateCheckoutAbleCart({
      items: [
        CheckoutTestHelper.generateCheckoutItem({ unitPrice: 5000, quantity: 1 }),
        CheckoutTestHelper.generateCheckoutItem({ unitPrice: 4999, quantity: 1 }),
      ]
    })
    const actual = CheckoutDomain.calculatePrice(cartToCheckout)
    expect(actual).toEqual(9999)
  })

  it('Can caculate promotion price', () => {
    const cartToCheckout = CheckoutTestHelper.generateCheckoutAbleCart({
      items: [
        CheckoutTestHelper.generateCheckoutItem({ unitPrice: 5000, quantity: 2 }),
      ]
    })
    const actual = CheckoutDomain.calculatePrice(cartToCheckout)
    expect(actual).toEqual(9500)
  })
})
