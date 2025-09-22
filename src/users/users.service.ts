import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'Super Admin', email: 'sa@example.com', role: 'superadmin' },
    { id: 4, name: 'Alice', email: 'alice@example.com', role: 'user' },
    { id: 5, name: 'Bob', email: 'bob@example.com', role: 'user' },
    { id: 6, name: 'Charlie', email: 'charlie@example.com', role: 'admin' },
  ];
  findAll(role?: 'admin' | 'user' | 'superadmin') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }
  create(user: {
    name: string;
    email: string;
    role: 'admin' | 'user' | 'superadmin';
  }) {
    const MaxuserID = Math.max(...this.users.map((user) => user.id));
    const newUser = { id: MaxuserID + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }
  update(
    id: number,
    userUpdate: UpdateUserDto, // Using UpdateUserDto to allow partial updates
  ) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null; // User not found
    }
    const updatedUser = { ...this.users[userIndex], ...userUpdate };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }
  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return { message: `User with id ${id} not found` }; // User not found
    }
    this.users.splice(userIndex, 1);
    return { message: `User with id ${id} deleted successfully` };
  }
}
