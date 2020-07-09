import * as MongoDb from 'mongodb'
import { User } from './user_type'

export function generateMockUser (props: Partial<User> = { }): User {
  return {
    id: new MongoDb.ObjectId(),
    email: 'chakrit.lj@gmail.com',
    hashPassword: 'randomstring',
    token: 'no_token',
    ...props
  }
}
