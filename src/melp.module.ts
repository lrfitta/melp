import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RestaurantController } from './controller/restaurant.controller';
import { RestaurantRepository } from './repository/restaurant.repository';
import { ConnectionService } from './service/connection.service';
import { RestaurantService } from './service/restaurant.service';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService, RestaurantRepository, ConnectionService],
  imports: [ConfigModule.forRoot()],
})
export class MelpModule { }
