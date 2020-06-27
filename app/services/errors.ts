class InvalidIdError extends Error {
  constructor(message = 'Invalid Id') {
    super(message)
    this.name = 'InvalidIdError'
  }
}
