import Joi from 'joi';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const validationSchema = Joi.object({
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  REFRESH_TOKEN_EXPIRES_IN: Joi.string().required(),
  RESET_PWD_TOKEN_EXPIRES_IN: Joi.string().required(),
});

const result = validationSchema.validate(process.env, {
  abortEarly: true,
  allowUnknown: true,
});

if (result.error) {
  console.log(result.error);
}

export type EnvVariables = {
  JWT_EXPIRES_IN: string;
  REFRESH_TOKEN_EXPIRES_IN: string;
  RESET_PWD_TOKEN_EXPIRES_IN: string;
  JWT_SECRET: string;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  DATABASE_PORT: number;
  DATABASE_HOST: string;
};

export const vars = result.value as EnvVariables;
