jest.mock('../services/user/user_service')
import { mocked } from 'ts-jest/utils'
import * as UserController from './user_controller'
import * as UserService from '../services/user/user_service'
import { InvalidLoginError } from '../services/errors'
import * as UserTestHelper from '../services/user/user_test_helper'

const mockUserService = mocked(UserService)
describe('LoginController', () => {
  it('throw InvalidLoginError if cannot login', async () => {
    mockUserService.login.mockRejectedValue(new InvalidLoginError())
    try {
      await UserController.LoginController({
        email: 'aaa@aaa.com',
        password: 'my_password'
      })
      throw new Error('Should not pass')
    } catch (err) {
      expect(err.name).toEqual('AuthenticationError')
    }
  })

  it('throw ValidationError if parameter incorrect', async () => {
    mockUserService.login.mockRejectedValue(new InvalidLoginError())
    try {
      await UserController.LoginController({
        emaxxxxxil: 'aaa@aaa.com',
        passwaaaaord: 'my_password'
      })
      throw new Error('Should not pass')
    } catch (err) {
      expect(err.name).toEqual('ValidationError')
    }
  })

  it('return token if login success', async () => {
    const user = UserTestHelper.generateMockUser({ token: 'my-token' })
    mockUserService.login.mockResolvedValue(user)
    const response = await UserController.LoginController({
      email: 'aaa@aaa.com',
      password: 'my_password'
    })
    expect(response.token).toEqual('my-token')
  })
})
