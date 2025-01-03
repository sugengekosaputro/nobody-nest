import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { postgresConfig } from '../databases/pg.config';
import { ITypeOrmService } from './interfaces/typeorm.service.interface';
import { TypeormService } from './services/typeorm.service';
import { AdminEntity } from '../../entities/admin.entity';
import { CustomersEntity } from '../../entities/customers.entity';
import { RoleEntity } from "../../entities/role.entity";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, CustomersEntity, RoleEntity]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        postgresConfig(configService),
    }),
  ],
  providers: [
    {
      provide: ITypeOrmService,
      useClass: TypeormService,
    },
  ],
  exports: [ITypeOrmService],
})
export class RepositoryModule {}
