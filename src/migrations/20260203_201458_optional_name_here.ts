import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blog_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_home_page_header_socials_icon" AS ENUM('github', 'linkedin', 'x', 'instagram', 'whatsapp');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "project_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tech" varchar
  );
  
  CREATE TABLE "project" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"description" varchar,
  	"thumbnail_image_id" integer NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "blog" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"status" "enum_blog_status" DEFAULT 'draft' NOT NULL,
  	"content" jsonb NOT NULL,
  	"category" varchar NOT NULL,
  	"published_date" timestamp(3) with time zone NOT NULL,
  	"project_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "text_assets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"book_call_cta" varchar,
  	"lets_chat_cta" varchar,
  	"writing" varchar,
  	"back_to_top_cta" varchar,
  	"follow_me_on" varchar,
  	"published" varchar,
  	"writings" varchar,
  	"writings_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"project_id" integer,
  	"blog_id" integer,
  	"text_assets_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page_header_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_page_header_socials_icon" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_avatar_id" integer,
  	"header_title" varchar,
  	"header_sub_title" varchar,
  	"header_description" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"project_id" integer,
  	"blog_id" integer
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project_stack" ADD CONSTRAINT "project_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "project" ADD CONSTRAINT "project_thumbnail_image_id_media_id_fk" FOREIGN KEY ("thumbnail_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_tags" ADD CONSTRAINT "blog_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog" ADD CONSTRAINT "blog_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_text_assets_fk" FOREIGN KEY ("text_assets_id") REFERENCES "public"."text_assets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_header_socials" ADD CONSTRAINT "home_page_header_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_header_avatar_id_media_id_fk" FOREIGN KEY ("header_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_project_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_rels" ADD CONSTRAINT "home_page_rels_blog_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "project_stack_order_idx" ON "project_stack" USING btree ("_order");
  CREATE INDEX "project_stack_parent_id_idx" ON "project_stack" USING btree ("_parent_id");
  CREATE INDEX "project_thumbnail_image_idx" ON "project" USING btree ("thumbnail_image_id");
  CREATE UNIQUE INDEX "project_slug_idx" ON "project" USING btree ("slug");
  CREATE INDEX "project_updated_at_idx" ON "project" USING btree ("updated_at");
  CREATE INDEX "project_created_at_idx" ON "project" USING btree ("created_at");
  CREATE INDEX "blog_tags_order_idx" ON "blog_tags" USING btree ("_order");
  CREATE INDEX "blog_tags_parent_id_idx" ON "blog_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blog_slug_idx" ON "blog" USING btree ("slug");
  CREATE INDEX "blog_project_idx" ON "blog" USING btree ("project_id");
  CREATE INDEX "blog_updated_at_idx" ON "blog" USING btree ("updated_at");
  CREATE INDEX "blog_created_at_idx" ON "blog" USING btree ("created_at");
  CREATE INDEX "text_assets_updated_at_idx" ON "text_assets" USING btree ("updated_at");
  CREATE INDEX "text_assets_created_at_idx" ON "text_assets" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_project_id_idx" ON "payload_locked_documents_rels" USING btree ("project_id");
  CREATE INDEX "payload_locked_documents_rels_blog_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_id");
  CREATE INDEX "payload_locked_documents_rels_text_assets_id_idx" ON "payload_locked_documents_rels" USING btree ("text_assets_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_page_header_socials_order_idx" ON "home_page_header_socials" USING btree ("_order");
  CREATE INDEX "home_page_header_socials_parent_id_idx" ON "home_page_header_socials" USING btree ("_parent_id");
  CREATE INDEX "home_page_header_header_avatar_idx" ON "home_page" USING btree ("header_avatar_id");
  CREATE INDEX "home_page_rels_order_idx" ON "home_page_rels" USING btree ("order");
  CREATE INDEX "home_page_rels_parent_idx" ON "home_page_rels" USING btree ("parent_id");
  CREATE INDEX "home_page_rels_path_idx" ON "home_page_rels" USING btree ("path");
  CREATE INDEX "home_page_rels_project_id_idx" ON "home_page_rels" USING btree ("project_id");
  CREATE INDEX "home_page_rels_blog_id_idx" ON "home_page_rels" USING btree ("blog_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "project_stack" CASCADE;
  DROP TABLE "project" CASCADE;
  DROP TABLE "blog_tags" CASCADE;
  DROP TABLE "blog" CASCADE;
  DROP TABLE "text_assets" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_page_header_socials" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "home_page_rels" CASCADE;
  DROP TYPE "public"."enum_blog_status";
  DROP TYPE "public"."enum_home_page_header_socials_icon";`)
}
