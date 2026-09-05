-- CreateTable
CREATE TABLE "calculations" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_email" TEXT,
    "housing_type" TEXT NOT NULL,
    "heating_type" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "monthly_cost" DECIMAL(10,2) NOT NULL,
    "ai_report" TEXT,
    "is_premium" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "calculations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "affiliate_clicks" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT NOT NULL,
    "calculation_id" TEXT,
    "ip_address" TEXT,

    CONSTRAINT "affiliate_clicks_pkey" PRIMARY KEY ("id")
);
