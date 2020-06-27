import * as MongoDb from 'mongodb'

export type Cart = {
  id: MongoDb.ObjectId;
  created: Date;
  hash: string;
  items: CartItem[];
}

export type CartItem = {
  productId: MongoDb.ObjectId;
  quantity: number;
}
