import {
    Pizza,
    Beef,
    Cookie,
    CupSoda,
    Salad,
    IceCreamCone,
    Fish,
    Soup,
    Sandwich,
    Drumstick,
    UtensilsCrossed,
    Truck,
    CreditCard,
    Star,
    type LucideIcon,
  } from "lucide-react";
  
  export const foodIcons: Record<string, LucideIcon> = {
    pizza: Pizza,
    beef: Beef,
    cookie: Cookie,
    drink: CupSoda,
    salad: Salad,
    icecream: IceCreamCone,
    fish: Fish,
    soup: Soup,
    sandwich: Sandwich,
    drumstick: Drumstick,
    default: UtensilsCrossed,
  };
  
  export function getFoodIcon(key: string): LucideIcon {
    return foodIcons[key] ?? foodIcons.default;
  }
  
  // Generic UI icons referenced by key from data files (e.g. WhyUs cards)
  export const uiIcons: Record<string, LucideIcon> = {
    truck: Truck,
    salad: Salad,
    card: CreditCard,
    star: Star,
  };
  
  export function getUiIcon(key: string): LucideIcon {
    return uiIcons[key] ?? Star;
  }
  