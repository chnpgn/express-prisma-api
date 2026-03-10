import { z } from "zod";

const addWatchlistSchema = z.object({
  movieId: z.string().uuid("Invalid movie ID"),

  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED", "TO_WATCH"])
    .optional(),

  rating: z.coerce
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 10")
    .max(10, "Rating must be between 1 and 10")
    .optional(),

  notes: z
    .string()
    .max(500, "Notes cannot exceed 500 characters")
    .optional(),
});

export { addWatchlistSchema };