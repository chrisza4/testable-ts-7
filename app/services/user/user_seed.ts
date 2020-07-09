import * as UserDomain from './user_domain'
import * as UserData from './user_data'
import * as UserTestHelper from './user_test_helper'

export async function seed (): Promise<unknown> {
  const user = UserTestHelper.generateMockUser({
    email: 'chakrit.lj@gmail.com',
    hashPassword: UserDomain.hashPassword('random')
  })
  return UserData.createUser(user)
}
