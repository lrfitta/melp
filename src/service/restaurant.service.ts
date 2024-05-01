import { Injectable, Logger } from '@nestjs/common';
import { RestaurantDto } from 'src/dto/restaurant.dto';
import { MelpError } from 'src/exception/melp.exception';
import { RestaurantModel } from 'src/model/entities';
import { RestaurantRepository } from 'src/repository/restaurant.repository';
import { IRestaurantService } from './interface/restaurant.service.interface';

@Injectable()
export class RestaurantService implements IRestaurantService {

  private readonly logger = new Logger(RestaurantService.name);

  constructor(private readonly repository: RestaurantRepository) { }

  async existRestaurant(id: string): Promise<RestaurantDto> {
    this.logger.log(`Searching id ${id}`);
    const model = await this.repository.getRestaurant(id);
    if (model) {
      const body = { ...model };
      delete body.updated_at;
      delete body.created_at;
      return body;
    }
    return null;
  }

  async createRestaurant(dto: RestaurantDto): Promise<boolean> {
    const restaturant = await this.existRestaurant(dto.id);
    if (restaturant) {
      throw new MelpError(`${dto.id} already exists.`, 'Data', 404);
    }
    const model: RestaurantModel = { ...dto, created_at: new Date() };
    const inserted = await this.repository.createRestaurant(model);
    this.logger.log(`Rows inserted ${inserted}`);
    return inserted > 0;
  }

  async getRestaurant(id: string): Promise<RestaurantDto> {
    const restaturant = await this.existRestaurant(id);
    if (!restaturant) {
      throw new MelpError(`${id} not exist.`, 'Data', 404);
    }
    return restaturant;
  }

}
