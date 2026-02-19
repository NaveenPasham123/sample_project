// Test database connection
const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Testing database connection...');
    console.log('📋 Database URL:', process.env.DATABASE_URL);
     
    // Test the connection by querying users
    const users = await prisma.user.findMany();
    
    console.log('✅ Database connected successfully!');
    console.log(`📊 Found ${users.length} users in the database`);
    if (users.length > 0) {
      console.log('Users:', users);
    }
    
  } catch (error) {
    if (error.message.includes('does not exist')) {
      console.error('❌ Database connection found but database does NOT exist!');
      console.error('   Database:', process.env.DATABASE_URL.match(/\/(\w+)/)?.[1] || 'unknown');
      console.error('\n📝 Next Steps:');
      console.error('   1. Create the database using: npx prisma migrate dev --name init');
      console.error('   2. Or connect to PostgreSQL and run: CREATE DATABASE mydb;');
    } else if (error.message.includes('connect ECONNREFUSED')) {
      console.error('❌ Cannot connect to PostgreSQL server!');
      console.error('   Ensure PostgreSQL is running on localhost:5432');
    } else {
      console.error('❌ Database connection error!');
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main();
