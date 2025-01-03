import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITypeOrmService } from '../../core/repository/interfaces/typeorm.service.interface';
import { RoleCreateDto } from '../dtos/role.create.dto';
import { RoleEntity } from '../../entities/role.entity';
import { TypeormHelper } from '../../helpers/typeorm.helper';
import { BaseSingleQueryParam } from '../../dtos/base.single.query.param';
import { RoleSingleQueryParam } from '../dtos/role.single.query.param';
import { ResponseDto } from '../../dtos/response.dto';

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

    const entity = await this.typeOrmService.roles.findOne({ where });

    // Throw an exception if the entity is not found
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
export class RoleUpdateUsecase {
  constructor(
    @Inject(ITypeOrmService)
    private readonly typeOrmService: ITypeOrmService,
    private readonly detailUsecase: RoleDetailUsecase,
  ) {}

  async execute(query: BaseSingleQueryParam, payload: RoleCreateDto) {
    const existingData = await this.detailUsecase.executeAsEntity(query);
    const entity = Object.assign(existingData, payload);
    await this.typeOrmService.roles.save(entity);

    return new ResponseDto({ message: 'Role updated' });
  }
}

@Injectable()
export class RoleDeleteUsecase {
  constructor(
    @Inject(ITypeOrmService)
    private readonly typeOrmService: ITypeOrmService,
  ) {}

  execute() {}
}
