import { prisma } from '../src/lib/prisma';

async function verify() {
  try {
    const userCount = await prisma.user.count();
    const productCount = await prisma.product.count();
    console.log(`Users: ${userCount}, Products: ${productCount}`);
    console.log('✅ Connected');
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
