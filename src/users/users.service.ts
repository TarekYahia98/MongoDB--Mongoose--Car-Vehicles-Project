import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateUserDto } from './dtos/update-user.dto';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  create(email: string, password: string) {
    const user = this.userModel.create({ email, password });
    return user;
  }

  async findOne(email: string) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }

  async findUsers() {
    const users = await this.userModel.find();
    return users;
  }

  findById(id: string) {
    if (!id) {
      return null;
    }

    const user = this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  async update(id: string, body: UpdateUserDto) {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    Object.assign(user, body);
    const scrypt = promisify(_scrypt);
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    user.password = result;
    return user.save();
  }

  async remove(id: string) {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return this.userModel.deleteOne({ _id: id });
  }
}
