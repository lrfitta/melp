import { Injectable, Logger } from "@nestjs/common";
import { RestaurantModel } from "src/model/entities";
import { ConnectionService } from "src/service/connection.service";
import { IRestaurantRepository } from "./interface/restaturant.repository.interface";

@Injectable()
export class RestaurantRepository implements IRestaurantRepository {

  private readonly logger = new Logger(RestaurantRepository.name);

  constructor(private readonly connection: ConnectionService) { }

  async createRestaurant(model: RestaurantModel): Promise<number> {
    let id = null;
    await this.connection.knex.transaction(async (trx) => {
      try {
        const response = await trx('restaurant')
          .withSchema(process.env.DB_SCHEMA)
          .insert(model)
        if (response && response.length > 0) {
          id = response[0];
        }
        await trx.commit();
      } catch (error) {
        await trx.rollback();
        this.logger.error(`Error creating the row ${model.id}`, error);
      }
    });
    return id;
  }

  async getRestaurant(id: string): Promise<RestaurantModel> {
    try {
      const query = this.connection.knex('restaurant')
        .withSchema(process.env.DB_SCHEMA)
        .select('*')
        .where({ id });
      const response = await query;
      if (!response || response.length == 0) {
        return null;
      }
      return response;
    } catch (exception) {
      this.logger.error(`Error searching the restaurant ${id}`, exception);
    }
    return null;
  }

  async updateRestaurant(model: RestaurantModel): Promise<number> {
    let updatedRows = 0;
    await this.connection.knex.transaction(async (trx) => {
      try {
        updatedRows = await trx('restaurant')
          .withSchema(process.env.DB_SCHEMA)
          .where({ id: model.id })
          .update({
            rating: model.rating,
            name: model.name,
            site: model.site,
            email: model.email,
            phone: model.phone,
            city: model.city,
            state: model.state,
            lat: model.lat,
            lng: model.lng,
            updated_at: new Date()
          })
        await trx.commit();
      } catch (error) {
        await trx.rollback();
        this.logger.error(`Error updating the row ${model.id}`, error);
      }
    });
    return updatedRows;
  }

  async deleteRestaurant(id: string): Promise<number> {
    let deletedRows = 0;
    await this.connection.knex.transaction(async (trx) => {
      try {
        deletedRows = await trx('restaurant')
          .withSchema(process.env.DB_SCHEMA)
          .where({ id })
          .del();
        await trx.commit();
      } catch (error) {
        await trx.rollback();
        this.logger.error(`Error deleting the row ${id}`, error);
      }
    });
    return deletedRows;
  }
} 