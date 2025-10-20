import express from 'express';
import dotenv from 'dotenv';
import exphbs from 'express-handlebars';
import session from 'express-session';
import flash from 'express-flash';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import connectFileStore from 'session-file-store';
import cors from "cors";

import templateRouter from './routes/templateRoute.js'

// import routes
import router from './routes/authRoutes.js';
import otpRouter from './routes/otpRoutes.js'
import resumeRouter from './routes/resumeRoute.js';

// import middleware
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

app.set('views', path.join(__dirname, 'views'));

// template engine
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'handlebars');

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

// cors config
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,               
}));

// flash
app.use(flash());

// middlewares custom 
app.use(flashMessageLocals);
app.use(setSession);

// routes
app.use('/auth', router);
app.use("/otp", otpRouter);
app.use("/", resumeRouter);
app.use("/", templateRouter);

app.get('/', (req, res) => {
    res.send("teste");
})


// start server
app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando: http://localhost:${process.env.PORT}`);
});
