import express from 'express'
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();


app.use(express.json())

const usuarios = []


app.get('/usuarios',async(req, res )=>{

    const usuarios = await prisma.usuarios.findMany();
    res.send('rotade listar usuario');
})

app.post('/usuarios',async(req, res )=>{

    const emailExist = await prisma.usuarios.findFirst({
        where : {
            email: req.body.email
        }
    })

    if (emailExist = null){
        res.status(400).json({message : "email ja existe"})
    }
   
   await prisma.usuarios.create({
    data:{
        name: req.body.name,
        age : req.body.age,
        email : req.body.email
    }
    }) ;

    res.status(201).json({
        message: "usuarios criado com sucesso",
    });
})

app.put('/usuarios/:id', async(req,res)=>{

    const userexist = await prisma.usuarios.findFirst({
        where : {
            email: req.body.email
        }
    })
    if(userexist == null){
        res.status(404).json({message : "user ja existe"})
    }
    },


    await prisma.usuarios.update(
        {
            where:{
                id: req.params.id
            },
        data:{
            name: req.body.name,
            age : req.body.age,
            email : req.body.email
        }
    }
)
);

res.status(200).json({
    message : "usuario atualizado com  sucesso"
})  
    app.delete('/usuarios/:id', async (req,res)=>{
        await prisma.usuarios.delete(
            {
            where:{
                id: req.params.id
            }},
        )
    res.send("okay")
})

app.listen(3000, ()=>{
    console.log("servidor rodando")
})