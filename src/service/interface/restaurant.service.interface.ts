import { RestaurantDto } from "src/dto/restaurant.dto";

export interface IRestaurantService {
  //Validate if a id exist or not
  existRestaurant(id: string): Promise<RestaurantDto | null>;
  //Fetch a row from the DB.
  getRestaurant(id: string): Promise<RestaurantDto | null>;
  //create a row
  createRestaurant(dto: RestaurantDto): Promise<boolean>;
}