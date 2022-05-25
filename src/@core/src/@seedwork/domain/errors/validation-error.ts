import {FieldsErrors} from '../validators/validator-fields-interface'

export  class ValidationError extends Error {}

export class EntityValidationError extends Error {
  constructor(public error: FieldsErrors) {
    super('Entity validationd error');
    this.name = 'EntityValidationError';
  }
}
