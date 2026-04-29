-- AlterTable
ALTER TABLE "Task" ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "Task_id_key";
