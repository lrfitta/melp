import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { RestaurantController } from './controller/restaurant.controller';
import { HttpExceptionFilter } from './exception/exception.filter';
import { RestaurantRepository } from './repository/restaurant.repository';
import { ConnectionService } from './service/connection.service';
import { RestaurantService } from './service/restaurant.service';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService, RestaurantRepository, ConnectionService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
  imports: [ConfigModule.forRoot()],
})
export class MelpModule { }
