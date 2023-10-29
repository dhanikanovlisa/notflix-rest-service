-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "last_name" TEXT,
    "first_name" TEXT,
    "password" TEXT,
    "email" TEXT NOT NULL,
    "phone_number" TEXT,
    "photo_profile" TEXT,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Film" (
    "film_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "film_path" TEXT NOT NULL,
    "film_poster" TEXT NOT NULL,
    "film_header" TEXT NOT NULL,
    "date_release" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("film_id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "genre_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("genre_id")
);

-- CreateTable
CREATE TABLE "film_genre" (
    "film_genre_id" SERIAL NOT NULL,
    "film_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    CONSTRAINT "film_genre_pkey" PRIMARY KEY ("film_genre_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "film_genre" ADD CONSTRAINT "film_genre_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "Film"("film_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "film_genre" ADD CONSTRAINT "film_genre_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("genre_id") ON DELETE RESTRICT ON UPDATE CASCADE;
