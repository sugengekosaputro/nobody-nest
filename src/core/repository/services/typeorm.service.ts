import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ITypeOrmService } from '../interfaces/typeorm.service.interface';
import { TypeOrmRepositoryAbstract } from '../interfaces/typeorm.repository.abstract';
import { AdminEntity } from '../../../entities/admin.entity';
import { CustomersEntity } from '../../../entities/customers.entity';
import { EntityManager } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { TypeormRepository } from '../implementor/typeorm.repository';
import { RoleEntity } from '../../../entities/role.entity';

@Injectable()
export class TypeormService implements ITypeOrmService, OnApplicationBootstrap {
  admin: TypeOrmRepositoryAbstract<AdminEntity>;
  customers: TypeOrmRepositoryAbstract<CustomersEntity>;
  roles: TypeOrmRepositoryAbstract<RoleEntity>;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,

    @InjectRepository(AdminEntity)
    private readonly adminRepository: TypeOrmRepositoryAbstract<AdminEntity>,

    @InjectRepository(CustomersEntity)
    private readonly customerRepository: TypeOrmRepositoryAbstract<CustomersEntity>,

    @InjectRepository(RoleEntity)
    private readonly roleRepository: TypeOrmRepositoryAbstract<RoleEntity>,
  ) {}
  onApplicationBootstrap(): any {
    this.admin = new TypeormRepository<AdminEntity>(
      AdminEntity,
      this.entityManager,
      this.adminRepository.queryRunner,
    );

    this.customers = new TypeormRepository<CustomersEntity>(
      CustomersEntity,
      this.entityManager,
      this.customerRepository.queryRunner,
    );

    this.roles = new TypeormRepository<RoleEntity>(
      RoleEntity,
      this.entityManager,
      this.roleRepository.queryRunner,
    );
  }
}
