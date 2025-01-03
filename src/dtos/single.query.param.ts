import { IsInt, IsOptional, IsUUID, ValidateIf } from "class-validator";

export class SingleQueryParam {
  @IsOptional()
  @IsInt({ message: 'id must be an integer.' })
  id?: number;

  @IsOptional()
  @IsUUID('4', { message: 'uuid must be a valid UUID.' })
  uuid?: string;

  @ValidateIf((o) => !o.id && !o.uuid)
  validateAtLeastOne() {
    throw new Error('At least one of "id" or "uuid" must be provided.');
  }
}