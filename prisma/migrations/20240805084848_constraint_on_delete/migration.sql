-- DropForeignKey
ALTER TABLE "onclicks" DROP CONSTRAINT "onclicks_widgetId_fkey";

-- DropForeignKey
ALTER TABLE "widgets" DROP CONSTRAINT "widgets_parentId_fkey";

-- AddForeignKey
ALTER TABLE "widgets" ADD CONSTRAINT "widgets_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "widgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onclicks" ADD CONSTRAINT "onclicks_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "widgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
