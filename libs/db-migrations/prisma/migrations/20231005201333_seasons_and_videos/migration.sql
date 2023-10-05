-- CreateTable
CREATE TABLE "seasons" (
    "id" SERIAL NOT NULL,
    "group_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "season_id" INTEGER NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
