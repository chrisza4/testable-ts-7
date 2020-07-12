jest.mock('../services/user/user_service')
import { mocked } from 'ts-jest/utils'
import * as Express from 'express'
import * as Supertest from 'supertest'
import * as ControllerHelper from './controller_helper'
import * as UserTestHelper from '../services/user/user_test_helper'
import { User } from '../services/user/user_type'
import * as UserService from '../services/user/user_service'

type TestRequest = {
  greetUser: string;
}

type TestRequestQueryString = {

}

type TestOutput = {

}

type TestResponse = {
  message: string;
}

describe('createExpressHandler', () => {
  it('return response from controller', async () => {
    const controller = async (body: TestRequest): Promise<TestResponse> => {
      return {
        message: `Hello ${body.greetUser}`
      }
    }

    const handler = ControllerHelper.createExpressHandler(controller)
    const app = Express()
    app.use(Express.json())
    app.post('/', handler)
    const response = await Supertest(app).post('/').send({ greetUser: 'Chris' })
    expect(response.body).toEqual({ message: 'Hello Chris' })
  })

  it('can inject querystring', async () => {
    const controller = async (body: TestRequest, querystring: ControllerHelper.QueryString): Promise<TestResponse> => {
      return {
        message: `Hello ${querystring.greetUser}`
      }
    }

    const handler = ControllerHelper.createExpressHandler(controller)
    const app = Express()
    app.use(Express.json())
    app.get('/', handler)
    const response = await Supertest(app).get('/?greetUser=Chris')
    expect(response.body).toEqual({ message: 'Hello Chris' })
  })

  it('can inject params', async () => {
    const controller = async (
      body: TestRequest,
      querystring: ControllerHelper.QueryString,
      params: ControllerHelper.Params
    ): Promise<TestResponse> => {
      return {
        message: `Hello ${params.user}`
      }
    }

    const handler = ControllerHelper.createExpressHandler(controller)
    const app = Express()
    app.use(Express.json())
    app.get('/:user', handler)
    const response = await Supertest(app).get('/Chris')
    expect(response.body).toEqual({ message: 'Hello Chris' })
  })

  it('Change validation error to 422', async () => {
    const controller = async (body: TestRequest): Promise<TestResponse> => {
      throw new ControllerHelper.ValidationError('Invalid input')
    }

    const handler = ControllerHelper.createExpressHandler(controller)
    const app = Express()
    app.use(Express.json())
    app.post('/', handler)
    const response = await Supertest(app).post('/').send({ greetUser: 'Chris' })
    expect(response.status).toEqual(422)
    expect(response.body).toEqual({
      statusCode: 422,
      errorMessage: 'Invalid input'
    })
  })

  it('Change internal error to 500', async () => {
    const controller = async (body: TestRequest): Promise<TestResponse> => {
      throw new Error('Some random error')
    }

    const handler = ControllerHelper.createExpressHandler(controller)
    const app = Express()
    app.use(Express.json())
    app.post('/', handler)
    const response = await Supertest(app).post('/').send({ greetUser: 'Chris' })
    expect(response.status).toEqual(500)
    expect(response.body).toEqual({
      statusCode: 500,
      errorMessage: 'Some random error'
    })
  })

  describe('auth', () => {
    it('given authorization header, inject user', async () => {
      const controller = async (_: TestRequest, __: ControllerHelper.QueryString, ___: ControllerHelper.Params, user: User): Promise<TestResponse> => {
        return {
          message: `Hello ${user.email}`
        }
      }
      const user = UserTestHelper.generateMockUser({
        email: 'chakrit.lj@gmail.com',
      })
      mocked(UserService).getByToken.mockResolvedValue(user)
      const handler = ControllerHelper.createExpressHandler(controller, { requiredAuth: false })

      const app = Express()
      app.use(Express.json())
      app.get('/', handler)
      const response = await Supertest(app).get('/').set({
        'Authorization': 'Bearer token-x'
      })

      expect(response.body).toEqual({ message: 'Hello chakrit.lj@gmail.com' })
    })

    it('invalid authorization header, no user', async () => {
      const controller = async (_: TestRequest, __: ControllerHelper.QueryString, ___: ControllerHelper.Params, user: User): Promise<TestResponse> => {
        if (user) {
          throw new Error('User should not exists')
        }
        return {
          message: 'Haha'
        }
      }

      const handler = ControllerHelper.createExpressHandler(controller, { requiredAuth: false })

      const app = Express()
      app.use(Express.json())
      app.get('/', handler)
      const response = await Supertest(app).get('/').set({
        'Authorization': 'JSON Y'
      })
      expect(response.body).toEqual({ message: 'Haha' })
    })

    it('given required auth and no auth header, return 401', async () => {
      const controller = async (_: TestRequest, __: ControllerHelper.QueryString, ___: ControllerHelper.Params, user: User): Promise<TestResponse> => {
        return {
          message: 'Haha'
        }
      }
      const handler = ControllerHelper.createExpressHandler(controller, { requiredAuth: true })

      const app = Express()
      app.use(Express.json())
      app.get('/', handler)
      const response = await Supertest(app).get('/').set({
        'Authorization': 'JSON Y'
      })

      expect(response.status).toEqual(401)
      expect(response.body).toEqual({
        statusCode: 401,
        errorMessage: 'Authentication required'
      })
    })
  })
})
