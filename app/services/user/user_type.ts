import * as MongoDb from 'mongodb'

export type User = {
  id: MongoDb.ObjectId;
  email: string;
  hashPassword: string;
  token: string;
}
