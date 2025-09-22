import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users') // acts as a route prefix for all routes in this controller
export class UsersController {
  constructor(private readonly usersService: UsersService) {} // Dependency injection of UsersService

  /*
    GET     /users        -> getAllUsers()
    GET     /users/:id    -> getUserById()
    POST    /users        -> createUser()
    PATCH  /users/:id    -> updateUser()
    DELETE  /users/:id    -> deleteUser()
    */
  @Get() // handles GET requests to /users or /users?role=value
  findAll(@Query('role') role?: 'admin' | 'user' | 'superadmin') {
    return this.usersService.findAll(role);
  }
  @Get('superadmins') // handles GET requests to /users/superadmins
  findSuperAdmins() {
    return this.usersService.findAll('superadmin');
  }
  @Get(':id') // handles GET requests to /users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id); // +id converts string to number
  }
  @Get('admins') //should be defined before dynamic routes like ':id' because routes are matched in order and this would otherwise be treated as a dynamic id
  findAdmins() {
    return this.usersService.findAll('admin');
  }
  //   @Post() // handles POST requests to /users
  //   create() {
  //     return 'This action adds a new user';
  //   }
  @Post() // handles POST requests to /users
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'admin' | 'user' | 'superadmin';
    },
  ) {
    return this.usersService.create(user);
  }
  // @Patch(':id') // handles PATCH requests to /users/:id
  // update(@Param('id') id: string) {
  //   return `This action updates a #${id} user`;
  // }
  @Patch(':id') // handles PATCH requests to /users/:id
  update(
    @Param('id') id: string,
    @Body()
    userUpdate: Partial<{
      name: string;
      email: string;
      role: 'admin' | 'user' | 'superadmin';
    }>,
  ) {
    return this.usersService.update(+id, userUpdate);
  }

  // @Delete(':id') // handles DELETE requests to /users/:id
  // remove(@Param('id') id: string) {
  //   return `This action removes a #${id} user`;
  // }
  @Delete(':id') // handles DELETE requests to /users/:id
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
