ALTER TABLE "albums" RENAME COLUMN "user_id" TO "owner_id";--> statement-breakpoint
ALTER TABLE "albums" DROP CONSTRAINT "albums_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "albums" ADD CONSTRAINT "albums_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
