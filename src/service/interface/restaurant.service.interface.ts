import { RestaurantDto, RestaurantOptionalDto } from "src/dto/restaurant.dto";

export interface IRestaurantService {
  //Validate if a id exist or not
  existRestaurant(id: string): Promise<RestaurantDto | null>;
  //Fetch a row from the DB.
  getRestaurant(id: string): Promise<RestaurantDto | null>;
  //create a row
  createRestaurant(dto: RestaurantDto): Promise<boolean>;
  //delete a row
  deleteRestaurant(id: string): Promise<RestaurantDto>;
  //create a row
  updateRestaurant(dto: RestaurantOptionalDto): Promise<boolean>;
}