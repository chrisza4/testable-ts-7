import * as Express from 'express'
import * as ErrorView from '../views/error_view'
import { User } from '../services/user/user_type'
import * as UserService from '../services/user/user_service'

export type Body = {[key: string]: string | number | undefined}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryString = any
export type Params = {[key: string]: string | number | undefined}
export type ExpressHandler = (req: Express.Request, res: Express.Response) => Promise<unknown>
export type Controller<TOut> = (body: Body, queryString: QueryString, params: Params, user?: User) => Promise<TOut>
export type HandlerOption = {
  requiredAuth: boolean;
}

const defaultHandlerOption: HandlerOption = {
  requiredAuth: false
}

export function createExpressHandler<TOut> (controller: Controller<TOut>, opts: HandlerOption = defaultHandlerOption): ExpressHandler {
  return async (req, res): Promise<unknown> => {
    try {
      const body = req.body
      const queryString = req.query
      const params = req.params
      const authorization = getAuthorizationToken(req.headers.authorization)
      let user: User | undefined = undefined
      if (authorization) {
        user = (await UserService.getByToken(authorization)) || undefined
      }
      if (opts.requiredAuth && !user) {
        throw new AuthenticationError('Authentication required')
      }
      const result = await controller(body, queryString, params, user)
      return res.json(result)
    } catch (err) {
      const response = ErrorView.errorView(err)
      return res.status(response.statusCode).send(response)
    }
  }
}

function getAuthorizationToken (authorization: string | undefined): string | null {
  if (!authorization) {
    return null
  }
  if (authorization.startsWith('Bearer ')) {
    return authorization.substring(7, authorization.length)
  }
  return null
}

export class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'NotFoundError'
    this.message = message || 'Resource not found'
  }
}

export class AuthenticationError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'AuthenticationError'
    this.message = message || 'Invalid authentication'
  }
}
