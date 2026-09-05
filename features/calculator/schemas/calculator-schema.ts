import { z } from 'zod';

export const calculatorSchema = z.object({
  housingType: z.enum(['villa', 'apartment', 'townhouse']),
  size: z.number().int().min(10).max(1000),
  heatingType: z.enum(['electricity', 'district_heating', 'heat_pump', 'gas']),
  postalCode: z.string().min(3).max(10),
  monthlyCost: z.number().positive().max(50000),
  email: z.string().email().optional(),
});

export type CalculatorSchema = z.infer<typeof calculatorSchema>;
