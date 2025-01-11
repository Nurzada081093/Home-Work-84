import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import Task from "../models/Task";
import {ITask} from "../types";

const tasksRouter = express.Router();

tasksRouter.post("/", auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    const newTask: ITask = {
        title: expressReq.body.title,
        description: expressReq.body.description,
        status: expressReq.body.status,
    };

    try {
        const task = new Task({...newTask, user: user._id});
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

tasksRouter.get("/", auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    try {
        const tasks = await Task.find({user: user._id});
        res.send(tasks)
    } catch (error) {
        next(error);
    }
});

tasksRouter.patch("/:id", auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const taskId = expressReq.params.id;
    const userId = expressReq.user._id;

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            res.status(404).send({error: 'This task not found!'});
            return;
        }

        if (userId.toString() !== task.user.toString()) {
            res.status(403).send({error: 'You can not edit this task. This task belongs to another user!'});
            return;
        }

        task.title = expressReq.body.title;
        task.description = expressReq.body.description;
        task.status = expressReq.body.status;

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

tasksRouter.delete("/:id", auth, async (req, res, next) => {
    let expressReq = req as RequestWithUser;
    const taskId = expressReq.params.id;
    const userId = expressReq.user._id;

    try {

        const task = await Task.findById(taskId);

        if (!task) {
            res.status(404).send({error: 'This task not found!'});
            return;
        }

        if (userId.toString() !== task.user.toString()) {
            res.status(403).send({error: 'You can not delete this task. This task belongs to another user!'});
            return;
        }


        await task.deleteOne();
        res.send({message: "This task was successfully deleted!"});
    } catch (error) {
        next(error);
    }
});

export default tasksRouter;