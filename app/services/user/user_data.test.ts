import * as TestHelper from '../../test/test_helper'
import * as UserData from './user_data'
import * as UserTesthelper from './user_test_helper'

TestHelper.testWithDb('create and get', () => {
  it('should be able to create and get', async () => {
    const user = UserTesthelper.generateMockUser({ email: 'thisisuser@gmail.com' })
    await UserData.createUser(user)
    const savedUser = await UserData.getByEmail('thisisuser@gmail.com')
    expect(savedUser?.id.equals(user.id)).toBeTruthy()
  })
})

TestHelper.testWithDb('User token', () => {
  it('should be able to set and get user by token', async () => {
    const user = UserTesthelper.generateMockUser({ email: 'thisisuser@gmail.com' })
    const token = 'token_x'
    await UserData.createUser(user)
    const savedUser = await UserData.getByToken(token)
    expect(savedUser).toBeNull()
    await UserData.setToken(user.id, token)
    const savedUser2 = await UserData.getByToken(token)
    expect(savedUser2?.id.equals(user.id)).toBeTruthy()
  })
})
