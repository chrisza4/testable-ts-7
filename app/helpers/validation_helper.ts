import * as MongoDb from 'mongodb'
import * as Joi from '@hapi/joi'

export const JoiObjectId = Joi.custom((value, helpers) => {
  if (typeof value !== 'string') {
    throw new Error('Invalid Id')
  }
  if (!MongoDb.ObjectId.isValid(value)) {
    throw new Error('Invalid Id')
  }

  return new MongoDb.ObjectId(value)
})
