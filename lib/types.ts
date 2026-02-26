export type Role = "parent" | "admin";
export type SubscriptionPlan = "basic" | "standard" | "premium";
export type SubscriptionStatus = "active" | "paused" | "canceled";
export type PointTransactionType = "allocation" | "reservation" | "refund" | "penalty";
export type ToyUnitStatus =
  | "available"
  | "reserved"
  | "shipped"
  | "in_use"
  | "returned"
  | "cleaning"
  | "retired";
export type ToyUnitCondition = "new" | "good" | "worn" | "damaged";
export type RentalStatus = "reserved" | "shipped" | "active" | "return_requested" | "returned" | "lost";

export type ToyWithAvailability = {
  id: number;
  name: string;
  description: string;
  age_min_months: number;
  age_max_months: number;
  points_cost: number;
  tags: string[];
  image_url: string;
  available_units: number;
};
