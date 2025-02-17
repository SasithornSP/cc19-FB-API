require('dotenv').config()
const prisma =require('../models')

//beware order of table to delete 

async function resetDatabase() {
    const tableName = Object.keys(prisma)
    .filter(key =>!key.startsWith('$')&&!key.startsWith('_'))
    console.log(tableName);

    for(let table of tableName){
        await prisma[table].deleteMany()
        await prisma.$executeRawUnsafe(`Alter Table\`${table}\`auto_increment = 1`)
    }
}

console.log("Reset DB...");
resetDatabase()

//npm run resetDB