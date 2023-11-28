import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { jwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from 'src/decorator/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('create-user')
  async createUser(@Res() response, @Body() user: CreateUserDto) {
    const newUSer = await this.userService.createUser(user);
    return newUSer
      ? response.status(HttpStatus.CREATED).json({
          message: 'create a user Success',
          statusCode: HttpStatus.CREATED,
          user: newUSer,
        })
      : response.status(HttpStatus.BAD_REQUEST).json({
          message: 'create a user fail',
          statusCode: HttpStatus.BAD_REQUEST,
        });
  }

  @UseGuards(jwtAuthGuard, RolesGuard)
  @Roles(Role.Writer, Role.Admin)
  @Get('get-all-user')
  async getAllUser(@Res() response) {
    const listUser = await this.userService.getAllUser();
    return listUser
      ? response.status(HttpStatus.OK).json({
          message: 'get all user successfully',
          statusCode: HttpStatus.OK,
          listUser,
        })
      : response.status(HttpStatus.BAD_REQUEST).json({
          message: 'get list user fail',
          statusCode: HttpStatus.BAD_REQUEST,
        });
  }
  @Delete('delete-user/:id')
  async deleteUser(@Res() response, @Param('id') id: string) {
    const userDelete = await this.userService.deleteUser(id);
    return userDelete
      ? response.status(HttpStatus.OK).json({
          message: `have been delete user : ${id}`,
          userDelete,
        })
      : response.status(HttpStatus.BAD_REQUEST).json({
          message: `cannot delete user : ${id}`,
        });
  }
  @UseGuards(jwtAuthGuard)
  @Put('update-user/:id')
  async updateUser(
    @Res() response,
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    const userUpdate = await this.userService.updateUser(id, updateUser);
    return userUpdate
      ? response.status(HttpStatus.OK).json({
          message: `have been update user : ${id}`,
          userUpdate,
        })
      : response.status(HttpStatus.BAD_REQUEST).json({
          message: `cannot update user : ${id}`,
        });
  }
}
