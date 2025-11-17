// import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { UserService } from '../src/user.service';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly userService: UserService,
//     private readonly jwtService: JwtService,
//   ) {}

//   async register(userData: any) {
//     const hashedPassword = await bcrypt.hash(userData.password, 10);
//     const newUser = await this.userService.createUser({
//       ...userData,
//       password: hashedPassword,
//     });
//     return { message: 'User registered successfully', userId: newUser._id };
//   }

//   async validateUser(email: string, password: string) {
//     const user = await this.userService.findByEmail(email);
//     if (!user) throw new NotFoundException('User not found');

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

//     const { password: _, ...result } = user.toObject();
//     return result;
//   }

//   async login(user: any) {
//     const payload = { sub: user._id, roleId: user.roleId };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../src/user.service';
import {
  CreateUserDto,
  UserResponseDto,
  AuthResponseDto,
} from '../../../libs/lib/src/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Register a new user
  async register(userData: CreateUserDto): Promise<UserResponseDto> {
    const newUser = await this.userService.createUser(userData);
    // Return user data only (no token)
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      roleId: newUser.roleId,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  // Validate user credentials
  async validateUser(email: string, password: string): Promise<UserResponseDto> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    const { password: _, ...result } = user.toObject();
    return {
      id: result._id,
      name: result.name,
      email: result.email,
      roleId: result.roleId,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  // Login user and return JWT token
  async login(user: UserResponseDto): Promise<AuthResponseDto> {
    const payload = { sub: user.id, roleId: user.roleId };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
