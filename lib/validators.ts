import { z } from "zod";

export const reserveToySchema = z.object({
  toyId: z.coerce.number().int().positive()
});

export const requestReturnSchema = z.object({
  rentalId: z.string().uuid()
});

export const updateUnitSchema = z.object({
  unitId: z.coerce.number().int().positive(),
  status: z.enum(["available", "reserved", "shipped", "in_use", "returned", "cleaning", "retired"]),
  condition: z.enum(["new", "good", "worn", "damaged"])
});

export const upsertToySchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  name: z.string().min(2),
  description: z.string().min(10),
  age_min_months: z.coerce.number().int().min(0),
  age_max_months: z.coerce.number().int().max(120),
  points_cost: z.coerce.number().int().min(1),
  tags: z.string().default(""),
  image_url: z.string().url()
});

export const updateRentalSchema = z.object({
  rentalId: z.string().uuid(),
  status: z.enum(["reserved", "shipped", "active", "return_requested", "returned", "lost"])
});

export const simulateRenewalSchema = z.object({
  userId: z.string().uuid(),
  amount: z.coerce.number().int().positive()
});
