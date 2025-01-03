import { Body, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { RoleCreateDto } from './dtos/role.create.dto';
import { Public } from '../core/decorators/public.decorator';
import {
  RoleCreateUsecase, RoleDeleteUsecase,
  RoleDetailUsecase,
  RoleUpdateUsecase
} from "./usecases/role.create.usecase";
import { BaseSingleQueryParam } from '../dtos/base.single.query.param';

@Controller('role')
export class RoleController {
  constructor(
    private readonly createUsecase: RoleCreateUsecase,
    private readonly detailUsecase: RoleDetailUsecase,
    private readonly updateUsecase: RoleUpdateUsecase,
    private readonly deleteUsecase: RoleDeleteUsecase,
  ) {}

  @Public()
  @Post('create')
  roleCreate(@Body() payload: RoleCreateDto) {
    return payload;
  }

  @Public()
  @Get('findone')
  roleFindone(@Query() query: BaseSingleQueryParam) {
    return this.detailUsecase.executeAsResponse(query);
  }

  @Public()
  @Put('update')
  roleUpdate(
    @Query() query: BaseSingleQueryParam,
    @Body() payload: RoleCreateDto,
  ) {
    return this.updateUsecase.execute(query, payload);
  }
  @Public()
  @Delete('delete')
  roleDelete(@Query() query: BaseSingleQueryParam) {
    return this.deleteUsecase.execute(query);
  }
}
