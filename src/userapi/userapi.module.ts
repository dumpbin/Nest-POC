import { Module } from '@nestjs/common';
import { UserapiService } from './userapi.service';
import { UserapiController } from './userapi.controller';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [UserapiController],
  providers: [UserapiService],
})
export class UserapiModule {}
