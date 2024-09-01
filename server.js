import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import colors from "colors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import router from "./routes/userRoutes.js"
import cors from "cors";
import adminRouter from "./routes/adminRoutes.js"
import doctorRouter from "./routes/doctorRoutes.js"
import passport from 'passport';
import initializePassport from './config/passport.js';
import session from "express-session"
import cookieParser from 'cookie-parser'
initializePassport(passport);
dotenv.config();
//rest object
const app=express();
app.use(cors());
app.use(cookieParser());
// Allow requests from http://localhost:3000
// app.use(cors({
//     origin: 'http://localhost:3000',
//   }));
  
app.use(bodyParser.urlencoded({extended:true}));
connectDB();

//midlleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
//oauth2.0 middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{secure:true}
}));
app.use(passport.initialize());
app.use(passport.session());
//oauth2.0 middleware
//routes

app.use('/api/v1/user',router);
app.use('/api/v1/admin',adminRouter);
app.use('/api/v1/doctor',doctorRouter);

//LISTEN
const port=process.env.PORT || 8080;
app.listen(8080,()=>{
    console.log(`server is listening on port ${port}`)
});