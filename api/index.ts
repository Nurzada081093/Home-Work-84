import express from "express";
import cors from "cors";
import mongoDb from "./mongoDb";
import * as mongoose from "mongoose";
import config from "./config";
import userRouter from "./routers/users";
import tasksRouter from "./routers/tasks";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/tasks', tasksRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));


