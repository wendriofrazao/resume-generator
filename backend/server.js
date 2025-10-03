import express from 'express';
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import session from 'express-session';
import flash from 'express-flash';
import path from 'path';
import FileStore from 'session-file-store';

// middlewares
import flashMessageLocals from './middlewares/flashMessage.js';
import setSession from './middlewares/setSession.js';

// conexão import
import connectionDB from './configs/db.js';

// ativar conexão
connectionDB();

//configuration dotenv
dotenv.config();

const app = express();


// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));


// session middleware
app.use(
    session({
        name: 'auth',
        secret: process.env.SECRETE_KEY,
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: () => {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true
        }
    }),
)

// flash messages
app.use(flash());

// middleware flash messages to views through locals
app.use(flashMessageLocals());
app.use(setSession());


app.listen(process.env.PORT, () => {
    console.log(`Seridor rodando com sucesso!, na url: http://localhost:${process.env.PORT}`);
})