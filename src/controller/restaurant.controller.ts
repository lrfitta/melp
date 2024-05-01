import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseFilters } from '@nestjs/common';
import { ResponseRestaurant, ResponseStatistics } from 'src/dto/response.dto';
import { RestaurantDto, RestaurantOptionalDto, StatisticsDto } from 'src/dto/restaurant.dto';
import { HttpExceptionFilter } from 'src/exception/exception.filter';
import { RestaurantService } from 'src/service/restaurant.service';

@Controller()
export class RestaurantController {

  private readonly logger = new Logger(RestaurantController.name);

  constructor(private readonly service: RestaurantService) { }

  @Get('/restaurants/manage/:id')
  @UseFilters(new HttpExceptionFilter())
  async getRestaurantById(@Param('id') id: string): Promise<RestaurantDto> {
    const restaurant = await this.service.getRestaurant(id);
    return restaurant;
  }

  @Post('/restaurants/manage')
  @UseFilters(new HttpExceptionFilter())
  async createRestaurant(@Body() restaurant: RestaurantDto): Promise<ResponseRestaurant> {
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

  @Delete('/restaurants/manage/:id')
  @UseFilters(new HttpExceptionFilter())
  async deleteRestaurantById(@Param('id') id: string): Promise<RestaurantDto> {
    const restaurant = await this.service.deleteRestaurant(id);
    return restaurant;
  }

  @Patch('/restaurants/manage')
  @UseFilters(new HttpExceptionFilter())
  async updateRestaurant(@Body() restaurant: RestaurantOptionalDto): Promise<ResponseRestaurant> {
    const flag = await this.service.updateRestaurant(restaurant);
    let statusCode = 200;
    let message = ['Success updating the record'];
    if (!flag) {
      statusCode = 500;
      message = ['Error updating the record'];
    }
    return {
      message, statusCode
    }
  }

  @Get('/restaurants/statistics')
  @UseFilters(new HttpExceptionFilter())
  async getStatistics(@Query() params: StatisticsDto): Promise<ResponseStatistics> {
    const statistics = await this.service.getStatistics(params);
    return statistics;
  }
}

