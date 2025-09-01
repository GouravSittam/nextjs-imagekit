CREATE TYPE "public"."media_type" AS ENUM('IMAGE', 'VIDEO');--> statement-breakpoint
CREATE TABLE "media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"original_url" text NOT NULL,
	"transformed_url" text DEFAULT '',
	"type" "media_type",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
