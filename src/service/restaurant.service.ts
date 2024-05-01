import { Injectable, Logger } from '@nestjs/common';
import { RestaurantDto } from 'src/dto/restaurant.dto';
import { MelpError } from 'src/exception/melp.exception';
import { RestaurantRepository } from 'src/repository/restaurant.repository';
import { IRestaurantService } from './interface/restaurant.service.interface';

@Injectable()
export class RestaurantService implements IRestaurantService {

  private readonly logger = new Logger(RestaurantService.name);

  constructor(private readonly orderRepository: RestaurantRepository) { }

  async getRestaurant(id: string): Promise<RestaurantDto> {
    this.logger.log(`Searching id ${id}`);
    const model = await this.orderRepository.getRestaurant(id);
    if (!model) {
      this.logger.error(`${id} not exist`);
      throw new MelpError(`${id} not exist.`, 'Data', 404);
    }
    const body = { ...model };
    delete body.updated_at;
    delete body.created_at;
    return body;
  }

}
