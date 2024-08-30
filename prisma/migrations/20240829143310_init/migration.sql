-- CreateTable
CREATE TABLE "Measure" (
    "id" SERIAL NOT NULL,
    "measure_value" DOUBLE PRECISION NOT NULL,
    "customer_code" TEXT NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL,
    "measure_type" TEXT NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Measure_customer_code_key" ON "Measure"("customer_code");
