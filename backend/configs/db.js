import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const connection = process.env.CONNECTION_MONGODB;

const connectionDB = async () => {
    if (!connection) {
        throw new Error("Connection do MongoDB não encontrada. Verificar o arquivo .env");
    }

    try {
        await mongoose.connect(connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Conectado ao MongoDB Atlas");
    } catch (error) {
        console.error(`Erro ao conectar no MongoDB Atlas: ${error}`);
    }
};

export default connectionDB;