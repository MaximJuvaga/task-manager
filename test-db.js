require('dotenv').config();
const{prisma}=require("./src/config/database");
async function main() {
   console.log("Тестируем подключение к базе данных...\n")
   let testUsers=null;
    try {
        console.log("Test 1: version DB...");
        const version=await prisma.$queryRaw`SELECT version()`;
        console.log("Version DB: ",version[0].version.split(" ")[0]);
        console.log('');

        console.log("Test 2: Tabl...");
        const tables = await prisma.$queryRaw`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `;
        if(tables.length>0){
            console.log("Tabl - ok")
            tables.forEach(table => console.log(`   - ${table.table_name}`));
        }else{
            console.log("Tabl -  not found");
        }
        console.log('');

        console.log("Test 3: Create test users...");
        const testUsers = await prisma.user.create({
            data:{
                name:"Test user",
                email:"testEmail.hui",
                password:"test"
            }
        });
        console.log("Users create: ", testUsers.id);
        console.log('');

        console.log('Test 4: All users...');
        const users = await prisma.user.findMany();
        console.log(`Найдено пользователей: ${users.length}`);
        users.forEach(user => {
        console.log(`   - ${user.id} ${user.name} (${user.email})`);
        });
        console.log('');

        console.log('Test 5: Delete test users...');
        if(testUsers){
           await prisma.user.deleteMany();
            // await prisma.user.delete({
            //     where: { id: testUsers.id }
            // });
        }
        console.log(' Delete test users');
        console.log('');

        console.log(' ВСЕ ТЕСТЫ ПРОЙДЕНЫ УСПЕШНО');
        console.log(' База данных работает корректно');
    } catch (error) {
        console.error('ОШИБКА:', error.message);
        console.error(error);
    }finally{
        await prisma.$disconnect();
        console.log('\n Соединение с базой данных закрыто')
    }
}
main();