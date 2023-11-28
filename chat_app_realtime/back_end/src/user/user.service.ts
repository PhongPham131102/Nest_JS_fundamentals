import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USerDocument, User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interface/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<USerDocument>) {}
  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const checkEmail = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (checkEmail)
      throw new HttpException('Email have been exists', HttpStatus.BAD_REQUEST);
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const { email, fullName } = createUserDto;
    const newUser: IUser = await this.userModel.create({
      email,
      fullName,
      password: hashPassword,
    });
    return { fullName, email };
  }
  async getAllUser(): Promise<USerDocument[]> {
    try {
      return await this.userModel.find(
        {},
        {
          password: 0,
          refreshToken: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      );
    } catch (error) {
      throw new HttpException('Get all user fail', HttpStatus.BAD_REQUEST);
    }
  }
  async deleteUser(id: string): Promise<USerDocument> {
    try {
      const removeUser = await this.userModel.findByIdAndDelete(id);
      return removeUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async updateUser(
    id: string,
    updateUser: UpdateUserDto,
  ): Promise<USerDocument> {
    try {
      const hashPassword = await bcrypt.hash(updateUser.password, 10);

      return await this.userModel.findByIdAndUpdate(
        id,
        { fullName: updateUser.fullName, password: hashPassword },
        {
          new: true,
        },
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async findOneById(id: string) {
    return await this.userModel.findById(id, { password: 0 });
  }
  async loginUser(loginUser: LoginUserDto): Promise<any> {
    const user = await this.userModel
      .findOne({ email: loginUser.email })
      .exec();

    return user;
  }
  async updateRefreshToken(id: string, refreshToken: string): Promise<any> {
    return await this.userModel.findByIdAndUpdate(id, { refreshToken });
  }
  async findOutRefreshToken(refreshToken: any) {
    return await this.userModel.findOne({ refreshToken });
  }
}
