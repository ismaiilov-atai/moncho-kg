CREATE TABLE IF NOT EXISTS "hourlyStats" (
	"id" integer GENERATED ALWAYS AS IDENTITY (sequence name "hourlyStats_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"stats_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"day_belong_to" uuid,
	"hour" varchar NOT NULL,
	"stats" integer NOT NULL,
	CONSTRAINT "hourlyStats_stats_id_unique" UNIQUE("stats_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "statistics" (
	"id" integer GENERATED ALWAYS AS IDENTITY (sequence name "statistics_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"stats_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"day" varchar(255) NOT NULL
);
