import { object, string, number, InferType } from "yup";

export let watersourceSchema = object({
  id: string(),
  status: string(),
  source_type: string(),
  tech_type: string(),
  management: string(),
  country: string(),
  install_year: string(),
  area1: string(),
  area2: string(),
  area3: string(),
  area4: string(),
  location: object({
    latitude: number().required(),
    longitude: number().required(),
  }),
  geohash: string(),
}).required();

export type WaterSource = InferType<typeof watersourceSchema>;
