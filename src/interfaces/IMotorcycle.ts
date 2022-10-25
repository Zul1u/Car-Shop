import { z } from 'zod';
import { VehicleZodSchema } from './IVehicle';

const MotorcycleZodSchema = VehicleZodSchema.extend({
  category: z.union([z.literal('Street'), z.literal('Custom'), z.literal('Trail')]),
  engineCapacity: z.number().int().positive().lte(2500),
});

type IMotorcycle = z.infer<typeof MotorcycleZodSchema>;

export { IMotorcycle, MotorcycleZodSchema };
