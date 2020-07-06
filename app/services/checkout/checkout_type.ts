import { Product } from '../product/product_type'

import * as MongoDb from 'mongodb'

export type CheckoutAbleCart = {
  id: MongoDb.ObjectId;
  items: CheckoutItem[];
}

export type CheckoutItem = Product & {
  quantity: number;
}
