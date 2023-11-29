/* eslint-disable camelcase */
import { createUser, deleteUser, updateUser } from "@/lib/actions/user.action";
import {
  DeletedObjectJSON,
  UserJSON,
  WebhookEvent,
} from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

// Define the event handlers map with type annotations
const eventHandlers: Record<string, (data: any) => Promise<Response>> = {
  "user.created": handleUserCreated,
  "user.updated": handleUserUpdated,
  "user.deleted": handleUserDeleted,
};

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const { get } = headers();
  const svix_id = get("svix-id");
  const svix_timestamp = get("svix-timestamp");
  const svix_signature = get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    return new Response("Error verifying webhook", { status: 400 });
  }

  const { type, data } = evt;
  const eventHandler = eventHandlers[type];

  if (eventHandler) {
    return eventHandler(data);
  }

  return NextResponse.json({ message: "OK" });
}

async function handleUserCreated(data: UserJSON): Promise<Response> {
  const { id, email_addresses, image_url, username, first_name, last_name } =
    data;
  const name = `${first_name}${last_name ? ` ${last_name}` : ""}`;

  const userData = {
    clerkId: id,
    name,
    username: username!,
    email: email_addresses[0].email_address,
    picture: image_url,
  };

  const mongoUser = await createUser(userData);

  return NextResponse.json({ message: "OK", user: mongoUser });
}

async function handleUserUpdated(data: UserJSON): Promise<Response> {
  const { id, email_addresses, image_url, username, first_name, last_name } =
    data;
  const name = `${first_name}${last_name ? ` ${last_name}` : ""}`;

  const updateData = {
    name,
    username: username!,
    email: email_addresses[0].email_address,
    picture: image_url,
  };

  const path = `/profile/${id}`;
  const mongoUser = await updateUser({ clerkId: id, updateData, path });

  return NextResponse.json({ message: "OK", user: mongoUser });
}

async function handleUserDeleted(data: DeletedObjectJSON): Promise<Response> {
  const { id } = data;

  const deletedUser = await deleteUser({
    clerkId: id!,
  });

  return NextResponse.json({ message: "OK", user: deletedUser });
}
