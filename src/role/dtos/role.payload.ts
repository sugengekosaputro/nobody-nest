import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoleType } from "../../entities/role.entity";


export class RolePayload {
  @IsNotEmpty({ message: 'field name required.' })
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty({ message: 'field type required.' })
  @IsString()
  @IsEnum(RoleType)
  type: string;
}
