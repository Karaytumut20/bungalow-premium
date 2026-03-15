import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.$connect()
    console.log("Connected to database successfully")
  } catch (e) {
    console.error("Database connection failed", e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
