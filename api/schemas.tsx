import { object, string, number, InferType, array } from "yup";

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

export let userSchema = object({
  id: string(),
  name: string(),
}).required();

export let commentSchema = object({
  id: string(),
  text: string(),
  likes: number(),
  author: object({ userSchema }),
}).required();

export let postSchema = object({
  id: string(),
  question: string(),
  answer: string(),
  comments: array().of(commentSchema),
}).required();

export let handPumpGuideSchema = object({
  id: string(),
  name: string(),
  quick_fixes: array().of(postSchema),
  pump_head: array().of(postSchema),
  handle: array().of(postSchema),
  pump_stand: array().of(postSchema),
  pump_rods: array().of(postSchema),
}).required();

export type WaterSource = InferType<typeof watersourceSchema>;
export type Post = InferType<typeof postSchema>;
export type HandPumpGuide = InferType<typeof handPumpGuideSchema>;
export type Comment = InferType<typeof commentSchema>;
export type User = InferType<typeof userSchema>;
