import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as process from 'node:process';
import { ITypeOrmService } from '../core/repository/interfaces/typeorm.service.interface';
import { RoleEntity, RoleType } from '../entities/role.entity';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(ITypeOrmService)
    private readonly typeOrmService: ITypeOrmService,
  ) {
    this.saltRounds = +process.env.BCRYPT_SALT;
    this.users = [
      {
        id: 1,
        username: 'john',
        password: this.hashPassword('password'),
        isActive: true,
      },
      {
        id: 2,
        username: 'john',
        password: this.hashPassword('password'),
        isActive: true,
      },
      {
        id: 3,
        username: 'john',
        password: this.hashPassword('password'),
        isActive: true,
      },
      {
        id: 4,
        username: 'doe',
        password: this.hashPassword('password'),
        isActive: true,
      },
      {
        id: 5,
        username: 'mike',
        password: this.hashPassword('password'),
        isActive: true,
      },
      {
        id: 6,
        username: 'tyson',
        password: this.hashPassword('password'),
        isActive: true,
      },
      {
        id: 7,
        username: 'jack',
        password: this.hashPassword('password'),
        isActive: false,
      },
    ];
  }

  private readonly saltRounds: number;
  private readonly users: any[] = [];
  private secretKey = this.configService.get<string>('JWT_KEY');
  private secretKeyRefresh = this.configService.get<string>('JWT_KEY_REFRESH');

  // Validate user credentials
  async validateUser(username: string, password: string): Promise<any> {
    const user = this.users.find((user) => user.username === username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new BadRequestException({ 'Invalid credentials': 'a' });
    }
  }

  // Login and return access & refresh tokens
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.generateAccessToken(payload), // Generate access token
      refreshToken: this.generateRefreshToken(payload), // Generate refresh token
    };
  }

  getAll() {
    return this.users;
  }

  getOne(users: any) {
    const user = this.users.find((user) => user.id === users.sub);
    if (user) {
      return user;
    }

    throw new NotFoundException('User not found');
  }

  // Handle refresh token: Validate refresh token and issue new access token
  async refreshToken(_user: any) {
    try {
      const user = this.users.find((user) => user.id === _user.sub);
      if (!user) {
        throw new UnauthorizedException('Invalid user');
      }

      const payload = { username: user.username, sub: user.id };
      // Generate new access and refresh tokens
      const newAccessToken = this.generateAccessToken(payload);
      const newRefreshToken = this.generateRefreshToken(payload);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken, // Optional: Issue a new refresh token
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // Generate a new access token
  private generateAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: this.secretKey,
      expiresIn: '5m',
    });
  }

  // Generate a new refresh token
  private generateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      secret: this.secretKeyRefresh,
      expiresIn: '2h',
    });
  }

  private hashPassword(plainText: string): string {
    return bcrypt.hashSync(plainText, this.saltRounds);
  }

  async postAdmin(body: { name: string; description: string }) {
    const { name, description } = body;

    console.log(body);
    // const entity = this.typeOrmService.roles.create({
    //   name,
    //   description,
    //   type: 'public',
    // });

    const ett = new RoleEntity();
    ett.name = name;
    ett.description = description;
    ett.type = RoleType.internal;
    await this.typeOrmService.roles.save(ett);

    return 'Role saved';
  }
}
