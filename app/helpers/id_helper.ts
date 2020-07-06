import * as Crypto from 'crypto'

export function generateRandomId (): string {
  return Crypto.randomBytes(12).toString('hex')
}
