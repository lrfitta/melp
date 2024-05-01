import { Body, Controller, Get, Logger, Param, Post, UseFilters } from '@nestjs/common';
import { ResponseRestaurant } from 'src/dto/response.dto';
import { RestaurantDto } from 'src/dto/restaurant.dto';
import { HttpExceptionFilter } from 'src/exception/exception.filter';
import { RestaurantService } from 'src/service/restaurant.service';

@Controller()
export class RestaurantController {

  private readonly logger = new Logger(RestaurantController.name);

  constructor(private readonly service: RestaurantService) { }

  @Get('/restaurant/:id')
  @UseFilters(new HttpExceptionFilter())
  async getRestauranteById(@Param('id') id: string): Promise<RestaurantDto> {
    const restaurant = await this.service.getRestaurant(id);
    return restaurant;
  }

  @Post('/restaurant')
  @UseFilters(new HttpExceptionFilter())
  async createRestaurante(@Body() restaurant: RestaurantDto): Promise<ResponseRestaurant> {
    const flag = await this.service.createRestaurant(restaurant);
    let statusCode = 200;
    let message = ['Success creating the record'];
    if (!flag) {
      statusCode = 500;
      message = ['Error creating the record'];
    }
    return {
      message, statusCode
    }
  }
}
