"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";

export async function getUserById(params: any) {
  try {
    connectToDatabase();
    const { userId } = params;
    console.log("userId ", userId);
    const user = await User.findOne({ clerkId: userId });
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
