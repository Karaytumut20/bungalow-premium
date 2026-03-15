/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@bungalow.com';
  const password = 'password123';
  
  // Şifreyi hashle
  const hashedPassword = await bcrypt.hash(password, 10);

  // Admin kullanıcısını bularak güncelle veya oluştur
  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: 'ADMIN',
    },
    create: {
      email,
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  console.log(`✅ Admin hesabı başarıyla güncellendi/oluşturuldu!`);
  console.log(`📧 Email: ${email}`);
  console.log(`🔑 Şifre: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
