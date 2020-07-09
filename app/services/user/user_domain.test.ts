import * as UserTestHelper from './user_test_helper'
import * as UserDomain from './user_domain'

describe('hashPassword', () => {
  it('should be able to hash password to different string', () => {
    const password = 'my_password'
    const hashedPassword = UserDomain.hashPassword(password)
    expect(hashedPassword).not.toEqual(password)
  })
})

describe('validatePassword', () => {
  it('should be able to validate hased password', () => {
    const password = 'my_password'
    const hashedPassword = UserDomain.hashPassword(password)
    const user = UserTestHelper.generateMockUser({ hashPassword: hashedPassword })
    const validateValidPass = UserDomain.validatePassword(password, user)
    expect(validateValidPass).toBeTruthy()

    const validateInvalidPass = UserDomain.validatePassword('random', user)
    expect(validateInvalidPass).toBeFalsy()
  })
})
