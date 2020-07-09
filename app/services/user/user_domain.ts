import * as Bcrypt from 'bcrypt'
import { User } from './user_type'

export function validatePassword (password: string, user: User): boolean {
  return Bcrypt.compareSync(password, user.hashPassword)
}

export function hashPassword (password: string): string {
  return Bcrypt.hashSync(password, 10)
}
