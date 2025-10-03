import express from 'express';
import dotenv from 'dotenv';

import connectionDB from './configs/db';

// ativar conexão
connectionDB();

//configuration dotenv
dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
    console.log(`Seridor rodando com sucesso!, na url: http://localhost:${process.env.PORT}`);
})