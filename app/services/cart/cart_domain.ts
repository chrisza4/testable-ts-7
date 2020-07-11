import * as Moment from 'moment'
import { Cart } from './cart_type'

export function canAdd(cart: Cart, now: Date = new Date()): boolean {
  const threeMonthsAgo = Moment(now).subtract(3, 'months')
  return threeMonthsAgo.isSameOrBefore(cart.created)
}
