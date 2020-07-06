import { CheckoutAbleCart, CheckoutItem } from './checkout_type'
import { Cart } from '../cart/cart_type'
import * as ProductData from '../product/product_data'
import { InternalDataInconsistencyError } from '../errors'

export async function getCheckoutAbleCart (cart: Cart): Promise<CheckoutAbleCart> {
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
