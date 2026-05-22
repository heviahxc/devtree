
import { Router } from 'express';
import { body } from 'express-validator';
import { createAccount, getUser, login, updateProfile } from './handlers';
import { handleInputErrors } from './middleware/validation';
import { authenticate } from './middleware/auth';

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
    
router.get('/user',authenticate,getUser)
router.patch('/user',
    body('description').isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),
    body('handle').isLength({ min: 3 }).withMessage('El usuario debe tener al menos 3 caracteres'),
    handleInputErrors,
    authenticate,updateProfile)
    
export default router;


//root
//