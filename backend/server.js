import express from 'express';
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import session from 'express-session';
import flash from 'express-flash';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import connectFileStore from 'session-file-store';

import router from './routes/authRoutes.js';
import flashMessageLocals from './middlewares/flashMessage.js';
import setSession from './middlewares/setSession.js';
import connectionDB from './configs/db.js';

// config dotenv
dotenv.config();

// conexão DB
connectionDB();

// __dirname no ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static
app.use(express.static(path.join(__dirname, 'public')));

// template engine
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// session store
const FileStore = connectFileStore(session);

// session middleware 
app.use(
  session({
    name: 'auth',
    secret: process.env.SECRETE_KEY,
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: () => {},
      path: path.join(os.tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  })
);

// flash
app.use(flash());

// middlewares custom 
app.use(flashMessageLocals);
app.use(setSession);

// routes
app.use('/auth', router);

app.get('/', (req, res) => {
    res.send("teste");
})

// start server
app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando: http://localhost:${process.env.PORT}`);
});
