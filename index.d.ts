import * as Joi from 'joi';

declare module 'egg' {
  interface Application {
    Joi: typeof Joi;
  }

  interface Context {
    validate<T>(schema: Joi.Schema, data: T, opt?: Joi.ValidationOptions, autoThrow?: boolean):  Joi.ValidationResult<T> | any;
  }
}