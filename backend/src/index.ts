import express from 'express';
import {userRouter} from './router/user';
import { bailRouter } from './router/bail';
import cors from 'cors';
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser()); 
app.use(cors());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/bail", bailRouter);

app.listen(3000);