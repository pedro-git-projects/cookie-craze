-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "score" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
