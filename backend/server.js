import express from 'express';
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import session from 'express-session';
import flash from 'express-flash';
import path from 'path';

import connectionDB from './configs/db.js';

// ativar conexão
connectionDB();

//configuration dotenv
dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`Seridor rodando com sucesso!, na url: http://localhost:${process.env.PORT}`);
})