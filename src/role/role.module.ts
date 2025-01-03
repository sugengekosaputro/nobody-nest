import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RepositoryModule } from '../core/repository/repository.module';
import {
  RoleCreateUsecase,
  RoleDeleteUsecase,
  RoleDetailUsecase,
  RoleUpdateUsecase,
} from './usecases/role.create.usecase';

@Module({
  imports: [RepositoryModule, RepositoryModule],
  controllers: [RoleController],
  providers: [
    RoleCreateUsecase,
    RoleDetailUsecase,
    RoleUpdateUsecase,
    RoleDeleteUsecase,
  ],
  exports: [
    RoleCreateUsecase,
    RoleDetailUsecase,
    RoleUpdateUsecase,
    RoleDeleteUsecase,
  ],
})
export class RoleModule {}
