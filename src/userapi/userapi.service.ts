import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
@Injectable()
export class UserapiService {
  constructor(private readonly databaseService: DatabaseService) {}
 async create(createUserapiDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({ data: createUserapiDto });
  }

  async findAll(role?: "admin" | "user") {
    return this.databaseService.user.findMany({ where: { role } });
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserapiDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({ where: { id }, data: updateUserapiDto });
  }

  async remove(id: number) {
    return this.databaseService.user.delete({ where: { id } });
  }
}
