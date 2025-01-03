import { TypeOrmRepositoryAbstract } from './typeorm.repository.abstract';
import { AdminEntity } from '../../../entities/admin.entity';
import { CustomersEntity } from '../../../entities/customers.entity';
import { RoleEntity } from '../../../entities/role.entity';

export const ITypeOrmService = Symbol('ITypeOrmService');
export interface ITypeOrmService {
  admin: TypeOrmRepositoryAbstract<AdminEntity>;
  customers: TypeOrmRepositoryAbstract<CustomersEntity>;
  roles: TypeOrmRepositoryAbstract<RoleEntity>;
}
