import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto,LoginUserDto } from '../../../libs/lib/src/dto/user.dto';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('PRODUCT_SERVICE') private productClient: ClientProxy,
    @Inject('CATALOG_SERVICE') private catalogClient: ClientProxy,
     @Inject('USER_SERVICE') private userClient: ClientProxy,
  ) {}

  async getProducts() {
    return await firstValueFrom(
      this.productClient.send('get_products', {})
    );
  }

  async getCatalogItems() {
    return await firstValueFrom(
      this.catalogClient.send('get_catalog', {})
    );
  }

  // Get all users
  async getUsers() {
    return await firstValueFrom(this.userClient.send('get_users', {}));
  }

  // Register new user
  async registerUser(userDto: CreateUserDto) {
    return await firstValueFrom(this.userClient.send('register_user',userDto ));
  }

  // Login user
  async loginUser(loginData: LoginUserDto) {
    return await firstValueFrom(this.userClient.send('login_user', loginData));
  }
}
