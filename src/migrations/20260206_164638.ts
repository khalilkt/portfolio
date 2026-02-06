import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "text_assets" ADD COLUMN "download_cv_cta" varchar;
  ALTER TABLE "text_assets" ADD COLUMN "download_cv_link" varchar;
  ALTER TABLE "home_page" ADD COLUMN "resume_id" integer;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_resume_id_media_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "home_page_resume_idx" ON "home_page" USING btree ("resume_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page" DROP CONSTRAINT "home_page_resume_id_media_id_fk";
  
  DROP INDEX "home_page_resume_idx";
  ALTER TABLE "text_assets" DROP COLUMN "download_cv_cta";
  ALTER TABLE "text_assets" DROP COLUMN "download_cv_link";
  ALTER TABLE "home_page" DROP COLUMN "resume_id";`)
}
