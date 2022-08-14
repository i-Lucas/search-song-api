-- CreateTable
CREATE TABLE "bands" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "visits" INTEGER NOT NULL,

    CONSTRAINT "bands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bands_name_key" ON "bands"("name");
