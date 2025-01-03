// Custom Validation Decorator for "At Least One"
import {
  IsOptional,
  IsString,
  IsUUID,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export function AtLeastOneProperty(
  properties: string[],
  validationMessage: string,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'atLeastOneProperty',
      target: object.constructor,
      propertyName,
      options: { message: validationMessage },
      constraints: properties,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const object = args.object as Record<string, any>;
          return properties.some(
            (property) =>
              object[property] !== undefined && object[property] !== null,
          );
        },
      },
    });
  };
}

export class BaseSingleQueryParam {
  @IsOptional()
  @IsString({ message: 'id must be a string.' })
  id?: string;

  @IsOptional()
  @IsUUID('4', { message: 'uuid must be a valid UUID.' })
  uuid?: string;

  @AtLeastOneProperty(
    ['id', 'uuid'],
    'At least one of `id` or `uuid` must be provided.',
  )
  validateAtLeastOne!: string;
}
