import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'harus string' })
  @IsNotEmpty({ message: 'harus diisi' })
  username: string;

  @IsNotEmpty()
  password: string;
}
