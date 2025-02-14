require('dotenv').config()
const prisma =require('../models')
//คือการรีเซตตารางในdatabase
//beware order of table to delete 
//npm run resetDB
async function resetDatabase() {
    await prisma.$transaction ([
        prisma.user.deleteMany(),
        prisma.post.deleteMany(),
        prisma.comment.deleteMany(),
        prisma.like.deleteMany(),
        prisma.relationship.deleteMany(),
    ])
    await prisma.$executeRawUnsafe('Alter Table user auto_increment=1')
   
}

console.log("Reset DB...");
resetDatabase()