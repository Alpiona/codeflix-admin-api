import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigModuleOptions,
} from '@nestjs/config';
import { join } from 'path';
import * as Joi from 'joi';

const DB_SCHEMA = Joi.object({
  DB_VENDOR: Joi.string().required().valid('mysqll', 'sqlite'),
});

@Module({})
export class ConfigModule extends NestConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    return super.forRoot({
      envFilePath: [
        ...(Array.isArray(options.envFilePath)
          ? options.envFilePath
          : [options.envFilePath]),
        join(__dirname, `../envs/.env.${process.env.NODE_ENV}`),
        join(__dirname, '../envs/.env'),
      ],
      validationSchema: DB_SCHEMA,
      ...options,
    });
  }
}
