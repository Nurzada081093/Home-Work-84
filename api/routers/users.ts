import express from "express";
import mongoose, {Error} from "mongoose";
import User from "../models/User";

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        user.generateToken();

        await user.save();
        res.send(user);

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const ValidationErrors = Object.keys(error.errors).map((key) => ({
                field: key,
                message: error.errors[key].message,
            }));
            res.status(400).send({errors: ValidationErrors});
        }
        next(error);
    }
});

userRouter.post("/sessions", async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            res.status(400).send({error: "This username not found!"});
            return;
        }

        const isMatch = await user.checkPassword(req.body.password);


        if (!isMatch) {
            res.status(400).send({error: "This passwords is wrong!"});
            return;
        }

        user.generateToken();
        await user.save();
        res.send(user);

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

export default userRouter;

