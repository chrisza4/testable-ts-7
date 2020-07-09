import * as MongoDb from 'mongodb'
import * as MongoConnection from '../connections/mongodb'
import { User } from './user_type'

export async function createUser (user: User): Promise<User> {
  const collection = await userCollection()
  await collection.insertOne(user)
  return user
}

export async function getByEmail (email: string): Promise<User | null> {
  const collection = await userCollection()
  return collection.findOne({ email })
}

export async function setToken (userId: MongoDb.ObjectId, token: string): Promise<boolean> {
  const collection = await userCollection()
  const newUser = await collection.findOneAndUpdate({ id: userId }, {
    $set: {
      token: token
    }
  })
  return !!newUser
}

export async function getByToken (token: string): Promise<User | null> {
  const collection = await userCollection()
  return collection.findOne({ token })
}

export async function invalidateToken (token: string): Promise<boolean> {
  throw new Error('Not implemented')
}

async function userCollection (): Promise<MongoDb.Collection> {
  const client = await MongoConnection.getClient()
  return client.collection<User>('users')
}
