import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const postgresConfig = (
  configService: ConfigService,
): PostgresConnectionOptions => ({
  type: 'postgres',
  database: configService.get<string>('DB_NAME'),
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  schema: configService.get<string>('DB_SCHEMA'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
});
