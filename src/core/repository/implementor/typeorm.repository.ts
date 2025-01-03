import { TypeOrmRepositoryAbstract } from '../interfaces/typeorm.repository.abstract';
import { EntityManager, EntityTarget, QueryRunner } from 'typeorm';


export class TypeormRepository<T> extends TypeOrmRepositoryAbstract<T> {
  constructor(
    entityTarget: EntityTarget<T>,
    entityManager: EntityManager,
    queryRunner: QueryRunner,
  ) {
    super(entityTarget, entityManager, queryRunner);
  }
}
