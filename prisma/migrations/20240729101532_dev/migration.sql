-- CreateEnum
CREATE TYPE "WidgetType" AS ENUM ('HEADER', 'STACK', 'GROUP', 'IMAGE', 'TEXT', 'BUTTON', 'ANCHOR');

-- CreateEnum
CREATE TYPE "OnClickType" AS ENUM ('NAVIGATE');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sites" (
    "id" UUID NOT NULL,
    "domain" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "widgets" (
    "id" UUID NOT NULL,
    "siteId" UUID,
    "type" "WidgetType" NOT NULL,
    "position" INTEGER NOT NULL,
    "variant" TEXT,
    "value" TEXT,
    "parentId" UUID,

    CONSTRAINT "widgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "onclicks" (
    "widgetId" UUID NOT NULL,
    "type" "OnClickType" NOT NULL,
    "target" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "onclicks_pkey" PRIMARY KEY ("widgetId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "sites" ADD CONSTRAINT "sites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "widgets" ADD CONSTRAINT "widgets_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "widgets" ADD CONSTRAINT "widgets_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "widgets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onclicks" ADD CONSTRAINT "onclicks_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "widgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
