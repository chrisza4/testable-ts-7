export class InternalDataInconsistencyError extends Error {
  constructor(message = 'DataInconsistencyError') {
    super(message)
    this.name = 'InternalDataInconsistencyError'
  }
}

export class InvalidLoginError extends Error {
  constructor(message = 'InvalidLoginError') {
    super(message)
    this.name = 'InvalidLoginError'
  }
}
