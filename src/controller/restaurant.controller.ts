import { Controller, Get, Logger, Param, UseFilters } from '@nestjs/common';
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
}
