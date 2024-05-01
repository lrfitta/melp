//Restaurant table model
export interface RestaurantModel {
  id: string;
  rating?: number | null;
  name: string;
  site?: string | null;
  email?: string | null;
  phone?: string | null;
  city?: string | null;
  state?: string | null;
  lat: number;
  lng: number;
  created_at: Date;
  updated_at?: Date | null;
} 