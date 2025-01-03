import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RepositoryModule } from '../core/repository/repository.module';
import { RoleCreateUsecase, RoleDetailUsecase, RoleUpdateUsecase } from "./usecases/role.create.usecase";

@Module({
  imports: [RepositoryModule, RepositoryModule],
  controllers: [RoleController],
  providers: [RoleCreateUsecase, RoleDetailUsecase, RoleUpdateUsecase],
  exports: [RoleCreateUsecase, RoleDetailUsecase, RoleUpdateUsecase],
})
export class RoleModule {}
