// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('register')
//   async register(@Body() body: any) {
//     return this.authService.register(body);
//   }

//   @Post('login')
//   async login(@Body() body: any) {
//     const user = await this.authService.validateUser(body.email, body.password);
//     return this.authService.login(user);
//   }
// }
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  LoginUserDto,
  UserResponseDto,
  AuthResponseDto,
} from '../../../libs/lib/src/dto/user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Authentication') // Swagger group
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Register a new user
  @Post('register')
  @ApiOperation({ summary: 'Register a new user (returns user data)' })
  async register(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    return this.authService.register(body);
  }

  // Login user
  @Post('login')
  @ApiOperation({ summary: 'Login user and return JWT token' })
  async login(@Body() body: LoginUserDto): Promise<AuthResponseDto | { message: string }> {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }
}
