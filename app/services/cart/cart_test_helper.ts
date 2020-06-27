import * as MongoDb from 'mongodb'
import { Cart } from './cart_type'

export function generateMockCart (props: Partial<Cart>): Cart {
  return {
    id: new MongoDb.ObjectId(),
    created: new Date(),
    hash: String(new MongoDb.ObjectId()),
    items: [],
    ...props
  }
}
