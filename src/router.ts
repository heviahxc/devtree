
import { Router } from 'express';
import { body } from 'express-validator';
import { createAccount, login } from './handlers';
import { handleInputErrors } from './middleware/validation';

const router = Router();

router.post('/auth/register', 
    body('email').isEmail().withMessage('El email no es válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('handle').isLength({ min: 3 }).withMessage('El usuario debe tener al menos 3 caracteres'),
    handleInputErrors,
    createAccount);


router.post('/auth/login',
    body('email').isEmail().withMessage('El email no es válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña es requerida'),
    handleInputErrors,
    login);
    
export default router;


//root
//