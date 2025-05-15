ALTER TABLE "bookings_to_users" DROP CONSTRAINT "bookings_to_users_user_id_unique";--> statement-breakpoint
ALTER TABLE "bookings_to_users" DROP CONSTRAINT "bookings_to_users_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "bookings_to_users" DROP CONSTRAINT "bookings_to_users_booking_id_bookings_booking_id_fk";
--> statement-breakpoint
ALTER TABLE "bookings" ALTER COLUMN "user_belongs_to" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "bookings_to_users" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings_to_users" ADD CONSTRAINT "bookings_to_users_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
