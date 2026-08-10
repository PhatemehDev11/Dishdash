import { restaurantDetails } from "@/lib/constants/restaurant";
import type { MenuItem, RestaurantDetail } from "@/types/restaurant";

export interface FoodLookupResult {
  item: MenuItem;
  restaurant: RestaurantDetail;
}

export function getFoodItemById(id: string): FoodLookupResult | null {
  for (const restaurant of Object.values(restaurantDetails)) {
    const item = restaurant.menu.find((m) => m.id === id);
    if (item) return { item, restaurant };
  }
  return null;
}

export function getAllFoodItemIds(): string[] {
  return Object.values(restaurantDetails).flatMap((r) => r.menu.map((m) => m.id));
}


export function getRelatedItems(restaurant: RestaurantDetail, excludeId: string, limit = 3) {
  return restaurant.menu.filter((m) => m.id !== excludeId).slice(0, limit);
}
