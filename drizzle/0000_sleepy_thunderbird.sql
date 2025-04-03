CREATE TYPE "public"."status" AS ENUM('pending', 'confirmed', 'failed');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings" (
	"id" integer GENERATED ALWAYS AS IDENTITY (sequence name "bookings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"booking_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"with_you" integer NOT NULL,
	"status" "status",
	"when" timestamp NOT NULL,
	"slot_belongs_to" uuid NOT NULL,
	"user_belongs_to" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookins_to_slots" (
	"booking_id" uuid NOT NULL,
	"slot_id" uuid NOT NULL,
	CONSTRAINT "bookins_to_slots_booking_id_slot_id_pk" PRIMARY KEY("booking_id","slot_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "days" (
	"id" integer GENERATED ALWAYS AS IDENTITY (sequence name "days_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"day_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"passed" boolean,
	"day" date
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "slots" (
	"id" integer GENERATED ALWAYS AS IDENTITY (sequence name "slots_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slot_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"is_full" boolean NOT NULL,
	"space_left" integer NOT NULL,
	"time" timestamp NOT NULL,
	"day_belongs_to" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" integer GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" varchar(128) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"phone_number" varchar NOT NULL,
	"been_times" integer NOT NULL,
	CONSTRAINT "users_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings_to_users" (
	"user_id" varchar(128) NOT NULL,
	"booking_id" uuid NOT NULL,
	CONSTRAINT "bookings_to_users_user_id_booking_id_pk" PRIMARY KEY("user_id","booking_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookins_to_slots" ADD CONSTRAINT "bookins_to_slots_booking_id_bookings_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("booking_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookins_to_slots" ADD CONSTRAINT "bookins_to_slots_slot_id_slots_slot_id_fk" FOREIGN KEY ("slot_id") REFERENCES "public"."slots"("slot_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "slots" ADD CONSTRAINT "day_fk" FOREIGN KEY ("day_belongs_to") REFERENCES "public"."days"("day_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings_to_users" ADD CONSTRAINT "bookings_to_users_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings_to_users" ADD CONSTRAINT "bookings_to_users_booking_id_bookings_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("booking_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
