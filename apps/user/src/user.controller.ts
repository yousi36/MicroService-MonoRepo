// // import { Controller } from '@nestjs/common';
// // import { MessagePattern } from '@nestjs/microservices';
// // import { UserService } from './user.service';

// // @Controller()
// // export class UserController {
// //   constructor(private readonly userService: UserService) {}

// //   @MessagePattern('register_user')
// //   registerUser(data: any) {
// //     return this.userService.register(data);
// //   }

// //   @MessagePattern('login_user')
// //   loginUser(data: any) {
// //     return this.userService.login(data);
// //   }

// //   @MessagePattern('get_users')
// //   getUserProfile(userId: string) {
// //     return this.userService.getUser(userId);
// //   }
// // }


// // import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
// // import { AuthService } from '../auth/auth.service';
// // import { Roles } from '../auth/decorators/roles.decorator';
// // import { RolesGuard } from '../auth/guards/roles.guard';
// // import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// // import { UserService } from './user.service';

// // @Controller('users')
// // export class UserController {
// //   constructor(
// //     private readonly userService: UserService,
// //     private readonly authService: AuthService,
// //   ) {}

// //   @Post('register')
// //   async register(@Body() body: any) {
// //     return this.userService.createUser(body);
// //   }

// //   @Post('login')
// //   async login(@Body() body: any) {
// //     const user = await this.authService.validateUser(body.email, body.password);
// //     if (!user) return { message: 'Invalid credentials' };
// //     return this.authService.login(user);
// //   }

// //   @UseGuards(JwtAuthGuard, RolesGuard)
// //   @Roles('admin') // only admin can access
// //   @Get('all')
// //   async getAllUsers() {
// //     return this.userService.findAll();
// //   }
// // }


// import { Controller } from '@nestjs/common';
// import { MessagePattern, Payload } from '@nestjs/microservices';
// import { UserService } from './user.service';
// import { AuthService } from '../auth/auth.service';
// import { CreateUserDto,LoginUserDto,UserResponseDto,AuthResponseDto } from '../../../libs/lib/src/dto/user.dto';

// @Controller()
// export class UserController {
//   constructor(
//     private readonly userService: UserService,
//     private readonly authService: AuthService,
//   ) {}

//   // Register user
//   @MessagePattern('register_user')
//   async registerUser(@Payload() data: any) {
//     // Hash password and create user
//     return this.authService.register(data);
//   }

//   // Login user
//   @MessagePattern('login_user')
//   async loginUser(@Payload() data: any) {
//     const user = await this.authService.validateUser(data.email, data.password);
//     if (!user) {
//       return { message: 'Invalid credentials' };
//     }
//     return this.authService.login(user);
//   }

//   // Get all users (example for admin)
//   @MessagePattern('get_users')
//   async getAllUsers() {
//     return this.userService.findAll();
//   }


// }


import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import {
  CreateUserDto,
  LoginUserDto,
  UserResponseDto,
  AuthResponseDto,
} from '../../../libs/lib/src/dto/user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('User Microservice') // Swagger group
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // Register user
  @MessagePattern('register_user')
  @ApiOperation({ summary: 'Register a new user' })
  async registerUser(@Payload() data: CreateUserDto): Promise<UserResponseDto> {
    return this.authService.register(data);
  }

  // Login user
  @MessagePattern('login_user')
  @ApiOperation({ summary: 'Login user and return JWT token' })
  async loginUser(@Payload() data: LoginUserDto): Promise<AuthResponseDto | { message: string }> {
    const user = await this.authService.validateUser(data.email, data.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.authService.login(user);
  }

  // Get all users (example for admin)
  @MessagePattern('get_users')
  @ApiOperation({ summary: 'Get all users (admin only)' })
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }
}
