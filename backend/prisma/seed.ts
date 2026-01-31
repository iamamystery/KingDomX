import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'muhammad.jawad@kinggroup.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!'
  const hashed = await bcrypt.hash(adminPassword, 10)

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Muhammad Jawad',
      password: hashed,
      role: 'ADMIN',
    },
  })

  console.log('Seed complete. Admin:', adminEmail, 'password:', adminPassword)
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
