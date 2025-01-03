import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoleType } from '../../entities/role.entity';

export class RoleCreateDto {
  @IsNotEmpty({ message: 'field role name required.' })
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty({ message: 'field role type required.' })
  @IsString()
  @IsEnum(RoleType)
  type: string;
}
