require('dotenv').config();

const{PrismaClient}= require("@prisma/client");
const {PrismaPg} = require("@prisma/adapter-pg");
const adapter = new PrismaPg({
    connectionString:process.env.DATABASE_URL
}) 

const prisma = new PrismaClient({adapter});

prisma.$connect(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  console.log(` DB Query ${params.model}.${params.action} took ${after - before}ms`);
  return result;
});

module.exports={prisma};