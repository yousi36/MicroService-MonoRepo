// import { Controller, Get } from '@nestjs/common';
// import { ApiGatewayService } from './api-gateway.service';

// @Controller('api-gateway')
// export class ApiGatewayController {
//   constructor(private readonly gatewayService: ApiGatewayService) {}

//   @Get('products')
//   getProducts() {
//     return this.gatewayService.getProducts();
//   }

//   @Get('catalog')
//   getCatalog() {
//     return this.gatewayService.getCatalogItems();
//   }

//   @Get('user')
//   getUser() {
//     return this.gatewayService.getUsers();
//   }
// }


// import { Controller, Get,Body,Post } from '@nestjs/common';
// import { ApiGatewayService } from './api-gateway.service';
// import { ApiTags, ApiOperation } from '@nestjs/swagger';

// @ApiTags('API Gateway') // Group for Swagger UI
// @Controller('api-gateway')
// export class ApiGatewayController {
//   constructor(private readonly gatewayService: ApiGatewayService) {}

//   @Get('products')
//   @ApiOperation({ summary: 'Get all products' })
//   getProducts() {
//     return this.gatewayService.getProducts();
//   }

//   @Get('catalog')
//   @ApiOperation({ summary: 'Get all catalog items' })
//   getCatalog() {
//     return this.gatewayService.getCatalogItems();
//   }
// // Users
//   @Get('users')
//   @ApiOperation({ summary: 'Get all users' })
//   getUsers() {
//     return this.gatewayService.getUsers();
//   }

//   // Register user
//   @Post('users/register')
//   @ApiOperation({ summary: 'Register a new user' })
//   registerUser(@Body() body: any) {
//     return this.gatewayService.registerUser(body);
//   }

//   // Login user
//   @Post('users/login')
//   @ApiOperation({ summary: 'Login user' })
//   loginUser(@Body() body: any) {
//     return this.gatewayService.loginUser(body);
//   }
// }

import { Controller, Get, Body, Post } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from '../../../libs/lib/src/dto/user.dto';


@ApiTags('API Gateway') // Group for Swagger UI
@Controller('api-gateway')
export class ApiGatewayController {
  constructor(private readonly gatewayService: ApiGatewayService) {}

  @Get('products')
  @ApiOperation({ summary: 'Get all products' })
  getProducts() {
    return this.gatewayService.getProducts();
  }

  @Get('catalog')
  @ApiOperation({ summary: 'Get all catalog items' })
  getCatalog() {
    return this.gatewayService.getCatalogItems();
  }

  // Users
  @Get('users')
  @ApiOperation({ summary: 'Get all users' })
  getUsers() {
    return this.gatewayService.getUsers();
  }

  // Register user
  @Post('users/register')
  @ApiOperation({ summary: 'Register a new user' })
  registerUser(@Body() userDto: CreateUserDto) {
    return this.gatewayService.registerUser(userDto);
  }

  // Login user
  @Post('users/login')
  @ApiOperation({ summary: 'Login user' })
  loginUser(@Body() loginDto: LoginUserDto) {
    return this.gatewayService.loginUser(loginDto);
  }
}
