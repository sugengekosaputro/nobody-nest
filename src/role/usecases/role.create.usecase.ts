import { Inject, Injectable } from '@nestjs/common';
import { ITypeOrmService } from '../../core/repository/interfaces/typeorm.service.interface';
import { RolePayload } from '../dtos/role.payload';
import { RoleEntity } from '../../entities/role.entity';

@Injectable()
export class RoleCreateUsecase {
  constructor(
    @Inject(ITypeOrmService)
    private readonly typeOrmService: ITypeOrmService,
  ) {}

  async execute(payload: RolePayload): Promise<string> {
    const entity = Object.assign(RoleEntity, payload);
    await this.typeOrmService.roles.save(entity);

    return 'Role created';
  }
}

@Injectable()
export class RoleFindoneUsecase {
  constructor(
    @Inject(ITypeOrmService)
    private readonly typeOrmService: ITypeOrmService,
  ) {}

  async execute(query: { id?: number; uuid?: string }) {
    try {
      const data = await this.typeOrmService.roles.findOne({
        where: { id: query.id, uuid: query.uuid },
      });

      if (data.id) {
        return data;
      }
    } catch (e) {
      console.log(e);
    }

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
  ) {}

  execute() {}
}

@Injectable()
export class RoleDeleteUsecase {
  constructor(
    @Inject(ITypeOrmService)
    private readonly typeOrmService: ITypeOrmService,
  ) {}

  execute() {}
}
