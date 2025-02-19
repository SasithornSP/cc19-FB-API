const prisma =require('../models')
const bcrypt=require("bcryptjs")

const hashdePassword = bcrypt.hashSync("123456",10)
const userData = [
    {
     firstname: 'Andy', lastname: 'Codecamp', password: hashdePassword, email: 'andy@ggg.mail',
     profileImage: 'https://www.svgrepo.com/show/420364/avatar-male-man.svg'
    },
    {
     firstname: 'Bobby', lastname: 'Codecamp', password: hashdePassword, email: 'bobby@ggg.mail',
     profileImage: 'https://www.svgrepo.com/show/420319/actor-chaplin-comedy.svg'
    },
    {
     firstname: 'Candy', lastname: 'Codecamp', password: hashdePassword, mobile: '1111111111',
     profileImage: 'https://www.svgrepo.com/show/420327/avatar-child-girl.svg'
    },
    {
     firstname: 'Danny', lastname: 'Codecamp', password: hashdePassword, mobile: '2222222222',
     profileImage: 'https://www.svgrepo.com/show/420314/builder-helmet-worker.svg'
    },
   ]
//npx prisma db seed
console.log('DB seed...');

async function seedDB() {
    await prisma.user.createMany({data:userData})
    
}
seedDB()
