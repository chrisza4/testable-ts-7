jest.mock('./checkout_data.ts')
jest.mock('./checkout_domain.ts')

import * as MongoDb  from 'mongodb'
import { mocked } from 'ts-jest/utils'
import * as CheckoutService from './checkout_service'
import * as CheckoutData from './checkout_data'
import * as CheckoutDomain from './checkout_domain'
import * as CheckoutTestHelper from './checkout_test_telper'


describe('checkoutByCartId', () => {
  it('return price', async () => {
    const mockedCart = CheckoutTestHelper.generateCheckoutAbleCart({ })
    const mockCheckoutData = mocked(CheckoutData)
    const mockCheckoutDomain = mocked(CheckoutDomain)
    mockCheckoutData.getCheckoutAbleCart.mockResolvedValue(mockedCart)
    mockCheckoutDomain.calculatePrice.mockImplementation(() => 500)

    expect(await CheckoutService.checkoutById(mockedCart.id)).toEqual(500)
    expect(mockCheckoutData.getCheckoutAbleCart.mock.calls[0][0].equals(mockedCart.id)).toBeTruthy()
    expect(mockCheckoutDomain.calculatePrice.mock.calls[0][0]).toEqual(mockedCart)
  })

  it('Return null if cart not found', async () => {
    const mockCheckoutData = mocked(CheckoutData)
    mockCheckoutData.getCheckoutAbleCart.mockResolvedValue(null)
    expect(await CheckoutService.checkoutById(new MongoDb.ObjectID)).toBeNull()
  })
})
