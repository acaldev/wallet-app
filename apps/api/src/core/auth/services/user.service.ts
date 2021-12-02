import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDTO } from '../dto/register.dto';
import { User, UserDocument } from '../schemas';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async fetch(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async get(id): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async add(user: RegisterDTO): Promise<User> {
    const { username, firstName, lastName, email, password } = user;
    const newUser = new this.userModel({
      username,
      firstName,
      lastName,
      email,
      password,
    });
    return newUser.save();
  }

  async update(id, user: User): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
    return updatedUser;
  }

  async delete(id): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndRemove(id);
    return deletedUser;
  }

  async alreadyRegistered(username: string, email: string): Promise<boolean> {
    const findUsername = await this.userModel.findOne({ username }).exec();
    const findEmail = await this.userModel.findOne({ email }).exec();
    return Boolean(findUsername || findEmail);
  }

  async findByEmailPassword(username: string, password: string): Promise<User> {
    const findUser = await this.userModel
      .findOne({ username, password })
      .exec();
    return findUser;
  }
}
