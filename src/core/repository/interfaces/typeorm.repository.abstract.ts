import { Repository } from 'typeorm';
export abstract class TypeOrmRepositoryAbstract<T> extends Repository<T> {}
