import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose, {Error} from "mongoose";
import User from "../models/User";
import Task from "../models/Task";
import {ITask} from "../types";

const tasksRouter = express.Router();

tasksRouter.post("/", auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;

    if (expressReq.body.user) {
        const user = await User.findById(expressReq.body.user);

        if (!user) {
            res.status(404).send({error: 'Not found this user!'});
            return;
        }
    }

    const newTask: ITask = {
        user: expressReq.body.user,
        title: expressReq.body.title,
        description: expressReq.body.description,
        status: expressReq.body.status,
    };

    try {
        const task = new Task(newTask);
        await task.save();
        res.send(task);
    } catch (error) {

        if (error instanceof mongoose.Error.ValidationError) {
            const ValidationErrors = Object.keys(error.errors).map((key) => ({
                field: key,
                message: error.errors[key].message,
            }));

            res.status(400).send({errors: ValidationErrors});
        }
        next(error);
        return;
    }
});

export default tasksRouter;