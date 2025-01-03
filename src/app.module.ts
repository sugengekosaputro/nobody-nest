import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from './core/databases/pg.config';
import { CustomerModule } from './customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './core/guards/jwt.guard';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { RoleModule } from './role/role.module';
import { AdminModule } from './admin/admin.module';
import { PermissionModule } from './permission/permission.module';
import { SeederModule } from './seeder/seeder.module';
import * as path from 'path';
import { RepositoryModule } from "./core/repository/repository.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
      envFilePath: path.resolve(__dirname, '.env'),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_KEY'),
        signOptions: { expiresIn: '6m' },
      }),
      inject: [ConfigService],
    }),
    RepositoryModule,
    AuthModule,
    CustomerModule,
    AccountModule,
    TransactionModule,
    RoleModule,
    AdminModule,
    PermissionModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
