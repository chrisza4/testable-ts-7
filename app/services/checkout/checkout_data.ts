import { CheckoutAbleCart, CheckoutItem } from './checkout_type'
import * as MongoDb from 'mongodb'
import * as ProductData from '../product/product_data'
import * as CartData from '../cart/cart_data'
import { InternalDataInconsistencyError } from '../errors'

export async function getCheckoutAbleCart (cartId: MongoDb.ObjectId): Promise<CheckoutAbleCart | null> {
  const cart = await CartData.getById(cartId)
  if (!cart) {
    return null
  }
  const productIds = new Set(cart.items.map(item => item.productId))
  const products = await ProductData.findByIds(Array.from(productIds))
  const checkoutAbleItems: CheckoutItem[] = cart.items.map(item => {
    const productForItem = products.find(p => p.id.equals(item.productId))
    if (!productForItem) {
      throw new InternalDataInconsistencyError('Item in cart is not exists')
    }
    return {
      ...productForItem,
      quantity: item.quantity
    }
  })
  return {
    id: cart.id,
    items: checkoutAbleItems
  }
}
