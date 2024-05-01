//Standard Response
export interface ResponseRestaurant {
  message: string[];
  error?: string;
  statusCode: number;
}

export interface ResponseStatistics {
  count: number;
  avg: number;
  std: number;
}