// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class UserService {
//   async register(data: any) {
//     // TODO: Save user to DB + send verification email
//     return { message: 'User registered', user: data };
//   }

//   async login(data: any) {
//     // TODO: validate email/password + issue JWT
//     return { message: 'User logged in', token: 'jwt-token-here' };
//   }

//   async getUser(userId: string) {
//     // TODO: load user by ID
//     return { id: userId, name: 'Yousaf Example' };
//   }
// }


// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';
// import { User, UserDocument } from '../../../libs/lib/src/database/schema';

// @Injectable()
// export class UserService {
//   constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

//   async createUser(data: any) {
//     const hashed = await bcrypt.hash(data.password, 10);
//     const created = new this.userModel({ ...data, password: hashed });
//     return created.save();
//   }

//   async findByEmail(email: string) {
//     return this.userModel.findOne({ email }).exec();
//   }

//   async findAll() {
//     return this.userModel.find().exec();
//   }
// }
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../../../libs/lib/src/database/schema';
import { CreateUserDto, UserResponseDto } from '../../../libs/lib/src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Create a new user (registration)
  async createUser(data: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const created = new this.userModel({ ...data, password: hashedPassword });
    const savedUser = await created.save();

    return {
      id: savedUser._id as string,
      name: savedUser.username,
      email: savedUser.email,
      roleId: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  // Find user by email (used in login)
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // Get all users (admin access)
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userModel.find().exec();
    return users.map(user => ({
      id: user._id  as string,
      name: user.username,
      email: user.email,
      roleId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }

  // Optional: Get a single user by ID
  async getUser(userId: string): Promise<UserResponseDto | null> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) return null;
    return {
      id: user._id as string,
      name: user.username,
      email: user.email,
     roleId: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
