import * as Joi from '@hapi/joi'
import * as ControllerHelper from './controller_helper'
import * as UserService from '../services/user/user_service'
import * as UserView from '../views/user_view'

export async function LoginController (body: ControllerHelper.Body): Promise<UserView.LoginResponse> {
  const loginRequest = parseLoginRequest(body)
  try {
    const user = await UserService.login(loginRequest.email, loginRequest.password)
    return UserView.LoginView(user)
  } catch (err) {
    switch (err.name) {
      case 'InvalidLoginError': throw new ControllerHelper.AuthenticationError()
      default: throw err
    }
  }
}

type LoginRequest = {
  email: string;
  password: string;
}

function parseLoginRequest (body: ControllerHelper.Body): LoginRequest {
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
  const validationResult = schema.validate(body, { stripUnknown: true })
  if (validationResult.error) {
    throw new ControllerHelper.ValidationError(validationResult.error.message)
  }
  return validationResult.value as LoginRequest
}

export const LoginHandler = ControllerHelper.createExpressHandler(LoginController)
