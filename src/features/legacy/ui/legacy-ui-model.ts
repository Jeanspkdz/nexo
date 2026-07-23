import type { ProviderCategoryId } from "@/features/marketplace/domain/models";

export type Category = ProviderCategoryId;
export type Screen =
  | "home"
  | "results"
  | "profile"
  | "service"
  | "compare"
  | "event"
  | "quotes"
  | "myevent"
  | "company";
