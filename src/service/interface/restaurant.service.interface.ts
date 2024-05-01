import { RestaurantDto } from "src/dto/restaurant.dto";

export interface IRestaurantService {
  //Fetch a row from the DB.
  getRestaurant(id: string): Promise<RestaurantDto | null>
}