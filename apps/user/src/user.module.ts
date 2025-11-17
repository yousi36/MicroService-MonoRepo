import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '@app/lib';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {User,UserSchema} from "../../../libs/lib/src/database/schema";
import { Role,RoleSchema } from '../../../libs/lib/src/database/schema';
import { AuthModule } from './auth/auth.module';
import { forwardRef } from '@nestjs/common';
import { ResendModule } from './resend.module';
import { MailModule } from './mail.module';




@Module({
  imports: [  
      ResendModule,
      MailModule,
    forwardRef(() => AuthModule),   // <-- Use forwardRef here
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
