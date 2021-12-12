-- CreateTable
CREATE TABLE "github_user" (
    "id" INTEGER NOT NULL,
    "login" VARCHAR NOT NULL,
    "avatar_url" VARCHAR,
    "type" VARCHAR NOT NULL,
    "name" VARCHAR,
    "company" VARCHAR,
    "blog" VARCHAR,
    "location" VARCHAR,
    "email" VARCHAR,
    "bio" VARCHAR,
    "twitter_username" VARCHAR,
    "public_repos" INTEGER NOT NULL,
    "public_gists" INTEGER NOT NULL,
    "followers" INTEGER NOT NULL,
    "following" INTEGER NOT NULL,
    "created_at" VARCHAR NOT NULL,
    "updated_at" VARCHAR NOT NULL,

    CONSTRAINT "github_user_pkey" PRIMARY KEY ("id")
);
