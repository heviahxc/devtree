import User from "../models/user";
import { Request, Response } from 'express';
import { checkPassword, hashPassword } from "../utils/auth";
import slug from 'slug';


export const createAccount = async (req: Request, res: Response) => {





const {email, password} = req.body;

const userExists = await User.findOne({email});

if(userExists){
     res.status(400).send('El email ya existe');
     return
}

const handle = slug(req.body.handle,'');
const handleExists = await User.findOne({handle: slug(handle)});
if(handleExists){
     res.status(400).send('El usuario ya existe');
     return;
}


const user = new User(req.body);
const hashedPassword = await hashPassword(password);
user.password = hashedPassword;     


user.handle = handle
    await  user.save();

    res.status(201).send('Usuario creado correctamente');

}       


export const login = async (req: Request, res: Response) => {


   const {email, password} = req.body;

const user= await User.findOne({email});

if(!user){
     res.status(401).send('El usuario no existe');
     return
}


//comparar contraseña

const isPasswordCorrect = await checkPassword(password, user.password); 


if(!isPasswordCorrect){
     res.status(401).send('Contraseña incorrecta');
     return
}   

res.status(200).send('Login exitoso');

}