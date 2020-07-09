import * as UserData from './user_data'
import * as UserDomain from './user_domain'
import * as Errors from '../errors'
import { User } from './user_type'
import { generateRandomId } from '../../helpers/id_helper'

export async function login (email: string, password: string): Promise<User> {
  const user = await UserData.getByEmail(email)
  if (!user) {
    throw new Errors.InvalidLoginError()
  }
  if (!UserDomain.validatePassword(password, user)) {
    throw new Errors.InvalidLoginError()
  }
  const token = generateRandomId()
  await UserData.setToken(user.id, token)
  return {
    ...user,
    token
  }
}

export async function getByToken (token: string): Promise<User | null> {
  return UserData.getByToken(token)
}
