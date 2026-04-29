import express, {Response,Request} from 'express';
import dotenv from 'dotenv';
import taskRoute from './task/task.route';

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json());

app.use('/task',taskRoute);

app.listen(port,() => {
    console.log(`Running on http://localhost:${port}`);
})