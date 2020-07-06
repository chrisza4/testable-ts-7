export type CheckoutResponse = {
  totalPrice: number;
}

export function CheckoutView (price: number): CheckoutResponse {
  return { totalPrice: price }
}
