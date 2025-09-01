"use server";

import {ZodError, z} from "zod/v4";

import {UnauthorizedError, ValidationError} from "@/lib/http-errors";

type ActionOptions<T> = {
  params?: T;
  schema?: z.ZodSchema<T>;
  authorize?: boolean;
};

const action = async <T>({params, schema, authorize}: ActionOptions<T>) => {
  // Validate params if schema is provided
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      }
      return new Error("Schema validation failed");
    }
  }

  let session: boolean | null = null;

  if (authorize) {
    // TODO: Replace with actual session retrieval from your auth provider
    // Example: const session = await getServerSession(authOptions);
    // Example: const session = await auth();
    // Example: const session = await getUserFromCookie();

    session = true; // Replace with real auth

    if (!session) {
      return new UnauthorizedError();
    }
  }

  return {params, session};
};

export default action;
