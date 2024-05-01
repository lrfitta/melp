import { Injectable, Logger } from '@nestjs/common';
import { ResponseStatistics } from 'src/dto/response.dto';
import { RestaurantColumn, RestaurantDto, RestaurantOptionalDto, StatisticsDto } from 'src/dto/restaurant.dto';
import { MelpError } from 'src/exception/melp.exception';
import { RestaurantModel } from 'src/model/entities';
import { RestaurantRepository } from 'src/repository/restaurant.repository';
import { Utils } from 'src/util/utils';
import { IRestaurantService } from './interface/restaurant.service.interface';

@Injectable()
export class RestaurantService implements IRestaurantService {

  private readonly logger = new Logger(RestaurantService.name);

  constructor(private readonly repository: RestaurantRepository) { }

  async getStatistics(dto: StatisticsDto): Promise<ResponseStatistics> {
    this.logger.log(`Lat: ${dto.lat}`);
    this.logger.log(`Long: ${dto.lng}`);
    this.logger.log(`Radius: ${dto.radius}`);
    let count = 0;
    let avg = 0;
    let std = 0;
    const restaurants = await this.repository.getRestaurantsByRadius(dto.lng, dto.lat, dto.radius);
    if (!restaurants || restaurants.length == 0) {
      throw new MelpError(`There arenot restaurants in the area`, 'Data', 500);
    }
    count = restaurants.length;
    avg = Utils.round2Decimals(restaurants.reduce((p, c) => p + c.rating, 0) / restaurants.length);
    std = Utils.round2Decimals(Math.pow(restaurants.reduce((p, c) => p + Math.pow(c.rating - avg, 2), 0) / (count - 1), 0.5));
    return { count, avg, std };
  }

  async deleteRestaurant(id: string): Promise<RestaurantDto> {
    const restaturant = await this.existRestaurant(id);
    if (!restaturant) {
      throw new MelpError(`${id} not exist.`, 'Data', 404);
    }
    const deletedRows = await this.repository.deleteRestaurant(id);
    if (deletedRows != 1) {
      throw new MelpError(`Error deleting the row`, 'Unexpected Error', 500);
    }
    return restaturant;
  }

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
    return inserted == 1;
  }

  async getRestaurant(id: string): Promise<RestaurantDto> {
    const restaturant = await this.existRestaurant(id);
    if (!restaturant) {
      throw new MelpError(`${id} not exist.`, 'Data', 404);
    }
    return restaturant;
  }

  async updateRestaurant(dto: RestaurantOptionalDto): Promise<boolean> {
    const restaurant = await this.existRestaurant(dto.id);
    if (!restaurant) {
      throw new MelpError(`${dto.id} not exists.`, 'Data', 404);
    }
    const keys: RestaurantColumn[] = ['rating', 'city', 'email', 'lat', 'lng', 'name', 'phone', 'rating', 'site', 'state', 'street'];
    const partial: Partial<RestaurantModel> = { updated_at: new Date() };
    for (const key of keys) {
      const k = key as string;
      if (dto[key] != restaurant[key]) {
        partial[k] = dto[key];
      }
    }
    const updatedRows = await this.repository.updateRestaurant(dto.id, partial);
    return updatedRows == 1;
  }

}
