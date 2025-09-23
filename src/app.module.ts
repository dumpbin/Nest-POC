import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { UserapiModule } from './userapi/userapi.module';
import { ThrottlerModule,ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from './logger/logger.module';
@Module({
  imports: [UsersModule, DatabaseModule, UserapiModule, ThrottlerModule.forRoot([{
    name:"short",
    ttl: 1000, // 1 second
    limit: 1, // 1 request per second
  },{
    name:"long",
    ttl: 60, // 1 minute
    limit: 100,// 100 requests per minute
  }]), LoggerModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,// Apply rate limiting globally
  }],
})
export class AppModule {}
