import {
  Pizza,
  Beef,
  CakeSlice,
  Coffee,
  Salad,
  IceCreamBowl,
} from "lucide-react";

export const CATEGORIES = [
  {
    title: "Pizza",
    icon: Pizza,
  },
  {
    title: "Burgers",
    icon: Beef,
  },
  {
    title: "Desserts",
    icon: CakeSlice,
  },
  {
    title: "Drinks",
    icon: Coffee,
  },
  {
    title: "Healthy",
    icon: Salad,
  },
  {
    title: "Ice Cream",
    icon: IceCreamBowl,
  },
];

export const POPULAR_DISHES = [
  {
    category: "ITALIAN",
    name: "Spicy Arrabbiata",
    price: "$18.00",
    image: "/Foods/SpicyArrabiate.png",
    color: "bg-rose-100",
  },
  {
    category: "MEDITERRANEAN",
    name: "Falafel Wrap",
    price: "$14.50",
    image: "/Foods/FalafelWrap.png",
    color: "bg-emerald-100",
  },
  {
    category: "THAI",
    name: "Yellow Curry Bowl",
    price: "$16.00",
    image: "/Foods/YellowCurryBowl.png",
    color: "bg-yellow-100",
  },
  {
    category: "JAPANESE",
    name: "Salmon Nigiri Set",
    price: "$23.00",
    image: "/Foods/SalmonNigiriSet.png",
    color: "bg-blue-100",
  },
];

export const WHY_CHOOSE_US = [
  {
    title: "Fast Delivery",
    description: "Hot food, delivered in 30 minutes or less, every time.",
    icon: "delivery",
  },
  {
    title: "Fresh Ingredients",
    description: "Partner kitchens sourced daily for quality you can taste.",
    icon: "fresh",
  },
  {
    title: "Secure Payment",
    description: "Encrypted checkout with every major card and wallet.",
    icon: "payment",
  },
  {
    title: "Top Rated Restaurants",
    description: "Only kitchens with 4.5+ ratings make it onto Dishdash.",
    icon: "rating",
  },
] as const;

export const STEP = [
  {
    id: "choose",
    number: 1,
    title: "Choose Restaurant",
    description: "Browse nearby kitchens and cuisines.",
    color: "bg-secondary",
  },
  {
    id: "select",
    number: 2,
    title: "Select Food",
    description: "Build your order from the full menu.",
    color: "bg-primary",
  },
  {
    id: "checkout",
    number: 3,
    title: "Checkout",
    description: "Pay securely in just a few taps.",
    color: "bg-accent",
  },
  {
    id: "enjoy",
    number: 4,
    title: "Enjoy Meal",
    description: "Track your rider and dig in.",
    color: "bg-danger",
  },
];

export const TESTIMONIAL = [
  {
    id: "rana",
    name: "Rana K.",
    rating: 5,
    comment:
      "Delivery was faster than the app even estimated, and the food arrived still hot. Genuinely impressed.",
    avatarInitial: "R",
    avatarColor: "#F87171",
  },
  {
    id: "milad",
    name: "Milad T.",
    rating: 5,
    comment:
      "The restaurant selection is huge and the app makes reordering my favorites effortless.",
    avatarInitial: "M",
    avatarColor: "#60A5FA",
  },
  {
    id: "sara",
    name: "Sara P.",
    rating: 4,
    comment:
      "Great deals every week. Customer support fixed an issue with my order in minutes.",
    avatarInitial: "S",
    avatarColor: "#FBBF24",
  },
];
