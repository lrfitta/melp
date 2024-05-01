import { RestaurantModel } from "src/model/entities";

export interface IRestaurantRepository {
  //Create a row in the table restaurant
  createRestaurant(model: RestaurantModel): Promise<number>;
  //Fetch a row from the DB.
  getRestaurant(id: string): Promise<RestaurantModel | null>
  //Update a row in the table.
  updateRestaurant(id: string, model: Partial<RestaurantModel>): Promise<number>;
  //Update a row in the table.
  deleteRestaurant(id: string): Promise<number>;
}