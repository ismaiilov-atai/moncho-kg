CREATE TABLE IF NOT EXISTS "bookings" (
	"id" integer GENERATED ALWAYS AS IDENTITY (sequence name "bookings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"booking_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"with_you" integer,
	"status" "status",
	"time" timestamp NOT NULL,
	"slot_belongs_to" uuid NOT NULL,
	"user_belongs_to" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookins_to_slots" (
	"booking_id" uuid NOT NULL,
	"slot_id" uuid NOT NULL,
	CONSTRAINT "bookins_to_slots_booking_id_slot_id_pk" PRIMARY KEY("booking_id","slot_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings_to_users" (
	"user_id" uuid NOT NULL,
	"booking_id" uuid NOT NULL,
	CONSTRAINT "bookings_to_users_user_id_booking_id_pk" PRIMARY KEY("user_id","booking_id")
);
--> statement-breakpoint
DROP TABLE "users_to_slots" CASCADE;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookins_to_slots" ADD CONSTRAINT "bookins_to_slots_booking_id_bookings_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("booking_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookins_to_slots" ADD CONSTRAINT "bookins_to_slots_slot_id_slots_slot_id_fk" FOREIGN KEY ("slot_id") REFERENCES "public"."slots"("slot_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings_to_users" ADD CONSTRAINT "bookings_to_users_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings_to_users" ADD CONSTRAINT "bookings_to_users_booking_id_bookings_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."bookings"("booking_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
