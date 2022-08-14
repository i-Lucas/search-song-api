-- CreateTable
CREATE TABLE "saved" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "song_identifier" TEXT NOT NULL,

    CONSTRAINT "saved_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "musics" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "visits" INTEGER NOT NULL,

    CONSTRAINT "musics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "musics_identifier_key" ON "musics"("identifier");

-- AddForeignKey
ALTER TABLE "saved" ADD CONSTRAINT "saved_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
