-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "options" JSONB,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
