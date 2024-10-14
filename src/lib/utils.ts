import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import { User } from "@clerk/nextjs/server";
import { UserResource } from "@clerk/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function relativeDate(from: Date): string {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}

export async function delay(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]/g, ""); // replace any character that is not a word character or a hyphen with an empty string. 
}

export function isAdmin(user: UserResource | User) {
  return user.publicMetadata?.role === "admin";
}