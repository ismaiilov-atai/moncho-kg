ALTER TABLE "slots" ALTER COLUMN "is_full" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "slots" ALTER COLUMN "space_left" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "slots" ALTER COLUMN "time" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "slots" ALTER COLUMN "time" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "slots" ALTER COLUMN "day_belongs_to" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users_to_slots" ADD CONSTRAINT "users_to_slots_user_id_slot_id_pk" PRIMARY KEY("user_id","slot_id");--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "been_times" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "slots" ADD CONSTRAINT "day_fk" FOREIGN KEY ("day_belongs_to") REFERENCES "public"."days"("day_id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
