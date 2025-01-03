import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolePayload } from './dtos/role.payload';
import { Public } from '../core/decorators/public.decorator';
import {
  RoleCreateUsecase,
  RoleFindoneUsecase,
} from './usecases/role.create.usecase';

@Controller('role')
export class RoleController {
  constructor(
    private readonly createUsecase: RoleCreateUsecase,
    private readonly findoneUsecase: RoleFindoneUsecase,
  ) {}

  @Public()
  @Post('create')
  roleCreate(@Body() payload: RolePayload) {
    return payload;
  }

  @Public()
  @Get('findone/:id')
  roleFindone(@Param('id') id: string) {
    return this.findoneUsecase.execute({ id: +id });
  }
}
