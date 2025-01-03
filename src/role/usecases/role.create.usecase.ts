import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITypeOrmService } from '../../core/repository/interfaces/typeorm.service.interface';
import { RoleCreateDto } from '../dtos/role.create.dto';
import { RoleEntity } from '../../entities/role.entity';
import { TypeormHelper } from '../../helpers/typeorm.helper';
import { BaseSingleQueryParam } from '../../dtos/base.single.query.param';
import { ResponseDto } from '../../dtos/response.dto';
import { BaseUpdateUsecase } from "../../core/usecases/base.update.usecase";
import { BaseDeleteUsecase } from "../../core/usecases/base.delete.uscase";

@Injectable()
export class RoleCreateUsecase {
  constructor(
    @Inject(ITypeOrmService)
    private readonly typeOrmService: ITypeOrmService,
  ) {}

  async execute(payload: RoleCreateDto): Promise<string> {
    const entity = Object.assign(RoleEntity, payload);
    await this.typeOrmService.roles.save(entity);

    return 'Role created';
  }
}

@Injectable()
export class RoleDetailUsecase {
  constructor(
    @Inject(ITypeOrmService)
    private readonly typeOrmService: ITypeOrmService,
  ) {}

  async executeAsResponse(query: BaseSingleQueryParam): Promise<ResponseDto> {
    const entity = await this.executeAsEntity(query);
    return new ResponseDto({ message: 'Data Available', data: entity });
  }

  async executeAsEntity(query: BaseSingleQueryParam): Promise<RoleEntity> {
    const validFields: Array<keyof BaseSingleQueryParam> = ['id', 'uuid'];

    const where = TypeormHelper.applyCondition(
      query,
      validFields,
    ) as Partial<RoleEntity>;

    console.log(where);
    const entity = await this.typeOrmService.roles.findOne({ where });
    console.log(entity);
    if (!entity) {
      throw new NotFoundException('Role not found');
    }

    return entity;
  }
}

@Injectable()
export class RoleFindAllUsecase {
  constructor(
    @Inject(ITypeOrmService)
    private readonly typeOrmService: ITypeOrmService,
  ) {}

  execute() {}
}

@Injectable()
export class RoleUpdateUsecase
  implements BaseUpdateUsecase<BaseSingleQueryParam, RoleCreateDto, ResponseDto>
{
  constructor(
    @Inject(ITypeOrmService)
    private readonly typeOrmService: ITypeOrmService,
    private readonly detailUsecase: RoleDetailUsecase,
  ) {}

  async execute(
    query: BaseSingleQueryParam,
    payload: RoleCreateDto,
  ): Promise<ResponseDto> {
    const existingData = await this.detailUsecase.executeAsEntity(query);
    const entity = Object.assign(existingData, payload);
    await this.typeOrmService.roles.save(entity);

    return new ResponseDto({ message: 'Role updated' });
  }
}

@Injectable()
export class RoleDeleteUsecase
  implements BaseDeleteUsecase<BaseSingleQueryParam>
{
  constructor(
    @Inject(ITypeOrmService)
    private readonly typeOrmService: ITypeOrmService,
    private readonly detailUsecase: RoleDetailUsecase,
  ) {}

  async execute(query: BaseSingleQueryParam): Promise<ResponseDto> {
    const existingData = await this.detailUsecase.executeAsEntity(query);
    console.log(existingData);

    // await this.typeOrmService.roles.restore(existingData);
    return new ResponseDto({ message: 'Role deleted' });
  }
}
