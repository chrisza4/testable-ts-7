import * as CheckoutDomain from './checkout_domain'
import * as CheckoutTestHelper from './checkout_test_telper'

describe('calculatePrice', () => {
  it('Can calculate normal price', () => {
    const cartToCheckout = CheckoutTestHelper.generateCheckoutAbleCart({
      items: [
        CheckoutTestHelper.generateCheckoutItem({ unitPrice: 500, quantity: 2 }),
        CheckoutTestHelper.generateCheckoutItem({ unitPrice: 100, quantity: 8 }),
      ]
    })
    const actual = CheckoutDomain.calculatePrice(cartToCheckout)
    expect(actual).toEqual(1800)
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
