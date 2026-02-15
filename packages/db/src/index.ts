import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

console.log(process.env.DATABASE_URL)
console.log(typeof(Bun.env.DATABASE_URL))

const adapter = new PrismaPg({ 
  connectionString: "postgresql://postgres:secret@localhost:5432/postgres"
});
export const prisma = new PrismaClient({ adapter });