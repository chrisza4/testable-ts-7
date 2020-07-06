import * as MongoDb from 'mongodb'
import { CheckoutAbleCart, CheckoutItem } from './checkout_type'
import * as ProductTestHelper from '../product/product_test_helper'

export function generateCheckoutAbleCart(props: Partial<CheckoutAbleCart>): CheckoutAbleCart {
  return {
    id: new MongoDb.ObjectId(),
    items: [
      generateCheckoutItem({ quantity: 3, unitPrice: 300 }),
      generateCheckoutItem({ quantity: 4, unitPrice: 100 })
    ],
    ...props
  }
}

export function generateCheckoutItem(props: Partial<CheckoutItem>): CheckoutItem {
  return {
    ...ProductTestHelper.generateMockProduct({ unitPrice: 300 }),
    quantity: 3,
    ...props
  }
}
