export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface OpeningHours {
  day: string;
  hours: string;
}

export interface RestaurantDetail {
  slug: string;
  name: string;
  icon: string;
  coverFrom: string;
  coverTo: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  distance: string;
  deliveryFee: string;
  isOpen: boolean;
  address: string;
  description: string;
  categories: string[];
  menu: MenuItem[];
  openingHours: OpeningHours[];
}
