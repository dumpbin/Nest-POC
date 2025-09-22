import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserapiService } from './userapi.service';
import { Prisma } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

// @SkipThrottle() // Skip rate limiting for all routes in this controller
@Controller('userapi')
export class UserapiController {
  constructor(private readonly userapiService: UserapiService) {}

  @Post()
  create(@Body() createUserapiDto: Prisma.UserCreateInput) {
    return this.userapiService.create(createUserapiDto);
  }
  @SkipThrottle() // Exempt this route from rate limiting
  @Get()
  findAll(@Query('role') role?: 'admin' | 'user') {
    return this.userapiService.findAll(role);
  }
  @Throttle({ short: { ttl: 1000, limit: 1 } }) // Apply specific rate limiting to this route
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userapiService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserapiDto: Prisma.UserUpdateInput,
  ) {
    return this.userapiService.update(+id, updateUserapiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userapiService.remove(+id);
  }
}
