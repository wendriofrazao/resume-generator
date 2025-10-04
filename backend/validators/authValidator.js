import {body} from 'express-validator'

export const registerValidator = [

body('fullname')
.trim()
.notEmpty().withMessage('Por favor, informe um nome')
.isLength({ min: 8, max: 30 }).withMessage('O nome de usuário deve ter entre 8 e 30 caracteres'),

body('email')
.trim()
.notEmpty().withMessage('Por favor, informe um email')
.isEmail().withMessage('Por favor, informe um email válido'),

body('password')
.notEmpty().withMessage('Por favor, informe uma senha')
.isLength({ min: 8 }).withMessage('A senha deve ter pelo menos 8 caracteres')
.matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
.withMessage('A senha deve conter letras, números e pelo menos um caractere especial (@$!%*?&)')
]

export const loginValidator = [

    body('email')
    .trim()
    .notEmpty().withMessage('Por favor, informe um email')
    .isEmail().withMessage('Por favor, informe um email válido'),

    body('password')
    .notEmpty().withMessage('Por favor, informe uma senha')
    .isLength({ min: 8 }).withMessage('A senha deve ter pelo menos 8 caracteres')
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .withMessage('A senha deve conter letras, números e pelo menos um caractere especial (@$!%*?&)')

]