export class InternalDataInconsistencyError extends Error {
  constructor(message = 'DataInconsistencyError') {
    super(message)
    this.name = 'InternalDataInconsistencyError'
  }
}
