import { User } from './user_type'

export async function login (email: string, password: string): Promise<User> {
  throw new Error('Not implemented')
}

export async function getByToken (token: string): Promise<User> {
  throw new Error('Not implemented')
}
