import * as ValidationHelper from './validation_helper'

describe('JoiObjectId', () => {
  it('Reject non-objectId string', () => {
    const val = 'some-string'
    const validationResult = ValidationHelper.JoiObjectId.validate(val)
    expect(validationResult.error).toBeDefined()
    expect(validationResult.error?.message).toEqual('"value" failed custom validation because Invalid Id')
  })

  it('Reject non-objectId number', () => {
    const val = 1234
    const validationResult = ValidationHelper.JoiObjectId.validate(val)
    expect(validationResult.error).toBeDefined()
    expect(validationResult.error?.message).toEqual('"value" failed custom validation because Invalid Id')
  })

  it('Transform valid objectId string to Mongo ObjectId', () => {
    const val = '5f0149bbdebd7e0c9944f7ab'
    const validationResult = ValidationHelper.JoiObjectId.validate(val)
    expect(validationResult.value.toHexString()).toEqual(val)
  })
})
