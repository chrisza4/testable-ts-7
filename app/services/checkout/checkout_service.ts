import * as MongoDb from 'mongodb'
import * as CheckoutData from './checkout_data'
import * as CheckoutDomain from './checkout_domain'

export async function checkoutById (id: MongoDb.ObjectId): Promise<number | null> {
  const cart = await CheckoutData.getCheckoutAbleCart(id)
  if (!cart) {
    return null
  }
  return CheckoutDomain.calculatePrice(cart)
}
