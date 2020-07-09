jest.mock('./user_data.ts')
jest.mock('./user_domain.ts')

import { mocked } from 'ts-jest/utils'
import * as UserData from './user_data'
import * as UserDomain from './user_domain'
import * as UserService from './user_service'
import * as UserTestHelper from './user_test_helper'

const mockUserDomain = mocked(UserDomain)
const mockUserData = mocked(UserData)

describe('login', () => {
  it('can login if username and password is correct', async () => {
    const user = UserTestHelper.generateMockUser()
    mockUserData.getByEmail.mockImplementation(async (email) => {
      if (email !== user.email) {
        throw new Error('Email invalid')
      }
      return user
    })
    mockUserDomain.validatePassword.mockReturnValue(true)

    const loginResult = await UserService.login(user.email, 'p')
    expect(loginResult.id.equals(user.id)).toBeTruthy()
  })

  it('cannot login if username is not exists in database', async () => {
    mockUserData.getByEmail.mockResolvedValue(null)
    try {
      await UserService.login('email@email', 'p')
      throw new Error('Should not pass')
    } catch (err) {
      expect(err.name).toEqual('InvalidLoginError')
    }
  })

  it('cannot login if password is not valid', async () => {
    const user = UserTestHelper.generateMockUser()
    mockUserData.getByEmail.mockImplementation(async (email) => {
      if (email !== user.email) {
        throw new Error('Email invalid')
      }
      return user
    })
    mockUserDomain.validatePassword.mockReturnValue(false)

    try {
      await UserService.login(user.email, 'p')
      throw new Error('Should not pass')
    } catch (err) {
      expect(err.name).toEqual('InvalidLoginError')
    }
  })
})
