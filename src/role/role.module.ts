import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RepositoryModule } from '../core/repository/repository.module';
import { RoleCreateUsecase, RoleFindoneUsecase } from "./usecases/role.create.usecase";

@Module({
  imports: [RepositoryModule, RepositoryModule],
  controllers: [RoleController],
  providers: [RoleCreateUsecase, RoleFindoneUsecase],
  exports: [RoleCreateUsecase, RoleFindoneUsecase],
})
export class RoleModule {}
