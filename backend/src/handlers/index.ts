import User from "../models/user";
import { Request, Response } from 'express';
import { checkPassword, hashPassword } from "../utils/auth";
import slug from 'slug';
import { generateToken } from "../utils/jwt";
import jwt from 'jsonwebtoken';


export const createAccount = async (req: Request, res: Response) => {





const {email, password, name, handle} = req.body;

const userExists = await User.findOne({email});

if(userExists){
     res.status(400).json({error: 'El email ya existe'});
     return
}

const handleFormatted = slug(handle,'');
const handleExists = await User.findOne({handle: handleFormatted});
if(handleExists){
     res.status(400).json({error: 'El usuario ya existe'});
     return;
}


const user = new User({name, email, handle: handleFormatted, password});
const hashedPassword = await hashPassword(password);
user.password = hashedPassword;     


    await  user.save();

    res.status(201).json({message: 'Usuario creado correctamente'});

}       


export const login = async (req: Request, res: Response) => {


   const {email, password} = req.body;

const user= await User.findOne({email});

if(!user){
     res.status(401).json({error: 'El usuario no existe'});
     return
}


//comparar contraseña

const isPasswordCorrect = await checkPassword(password, user.password); 


if(!isPasswordCorrect){
     res.status(401).json({error: 'Contraseña incorrecta'});
     return
}   

const token = generateToken({id: user._id});

res.status(200).json({message: 'Login exitoso', token});

}


export const getUser = async (req: Request, res: Response) => {
     res.json(req.user);
}    