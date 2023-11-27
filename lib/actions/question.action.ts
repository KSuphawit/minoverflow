"use server";

import { connectToDatabase } from "@/lib/mongoose";

export const createQeustion = async (params) => {
  try {
    connectToDatabase();
  } catch (err) {}
};
