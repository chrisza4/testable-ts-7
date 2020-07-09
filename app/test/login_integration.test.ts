import * as Supertest from 'supertest'
import App from '../server'
import * as TestHelper from './test_helper'
import * as UserData from '../services/user/user_data'
import * as UserTestHelper from '../services/user/user_test_helper'
import * as UserDomain from '../services/user/user_domain'

TestHelper.testWithDb('/login', () => {
  it('Can login', async () => {
    const user = UserTestHelper.generateMockUser({
      email: 'hello@world.co.th',
      hashPassword: UserDomain.hashPassword('my_pass')
    })
    await UserData.createUser(user)

    const response = await Supertest(App).post('/login').send({
      email: 'hello@world.co.th',
      password: 'my_pass'
    })

    expect(response.status).toEqual(200)
    expect(response.body.token).toBeTruthy()
  })
})
