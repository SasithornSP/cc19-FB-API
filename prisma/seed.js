const prisma =require('../models')
const bcrypt=require("bcryptjs")

const hashdePassword = bcrypt.hashSync("123456",10)
const userData = [
    {
        firstname:"Aommy",
        lastname:"CC19",
        email:"aommy@gmail.com",
        password:hashdePassword
    },
    {
    firstname: 'Bobby',
    lastname : 'Codecamp',
    email : 'bobby@ggg.mail',
    password : hashdePassword
   },
   {
    firstname: 'Candy',
    lastname : 'Codecamp',
    mobile : '1111111111',
    password : hashdePassword
   },
   {
    firstname: 'Danny',
    lastname : 'Codecamp',
    mobile : '2222222222',
    password : hashdePassword
   }
]
//npx prisma db seed
console.log('DB seed...');

async function seedDB() {
    await prisma.user.createMany({data:userData})
    
}
seedDB()
