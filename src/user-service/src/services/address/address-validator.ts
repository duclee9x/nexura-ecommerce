import { z } from "zod";

export const AddAndUpdateAddressSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    street: z.string(),
    city: z.string().optional(),
    state: z.string().optional(),
    countryId: z.string(),
    zip: z.string().optional(),
    vnProvinceId: z.string().optional(),
    vnDistrictId: z.string().optional(),
    vnWardId: z.string().optional(),
    isDefault: z.boolean(),
})
export const DeleteAddressSchema = z.object({
    addressId: z.string()
});

export type AddAndUpdateAddressInput = z.infer<typeof AddAndUpdateAddressSchema>;
export type DeleteAddressInput = z.infer<typeof DeleteAddressSchema>;
