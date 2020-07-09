import { User } from '../services/user/user_type'

export type LoginResponse = {
  token: string;
}

export function LoginView (user: User): LoginResponse {
  return {
    token: user.token
  }
}
