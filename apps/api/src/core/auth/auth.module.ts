import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controllers';
import { User, UserSchema } from './schemas';
import { AuthService, UserService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [UserService],
})
export class AuthModule {}
