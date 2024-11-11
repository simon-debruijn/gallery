CREATE TABLE IF NOT EXISTS "albums_customers" (
	"album_id" uuid,
	"customer_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "albums_customers" ADD CONSTRAINT "albums_customers_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "albums_customers" ADD CONSTRAINT "albums_customers_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
