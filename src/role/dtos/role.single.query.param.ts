import { BaseSingleQueryParam } from "../../dtos/base.single.query.param";
import { IsOptional, IsString } from "class-validator";

export class RoleSingleQueryParam extends BaseSingleQueryParam {
  @IsOptional()
  @IsString()
  name?: string;
}