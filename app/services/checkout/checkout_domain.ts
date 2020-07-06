import { CheckoutAbleCart } from './checkout_type'

export function calculatePrice(cart: CheckoutAbleCart): number {
  let sum = 0
  for (const item of cart.items) {
    sum += item.quantity * item.unitPrice
  }
  if (sum >= 10000) {
    // Promotion
    return sum * 0.95
  }
  return sum
}
