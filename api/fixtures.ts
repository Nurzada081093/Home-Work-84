import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "node:crypto";
import Task from "./models/Task";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('tasks');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not presents, skipping drop!');
    }

    const [userMolly, userSally, userEmma] = await User.create(
        {
            username: 'Molly',
            password: '123',
            token: randomUUID(),
        },
        {
            username: 'Sally',
            password: '1234',
            token: randomUUID(),
        },
        {
            username: 'Emma',
            password: '12345',
            token: randomUUID(),
        }
    );

    await Task.create(
        {
            user: userMolly._id,
            title: 'Attractor',
            description: 'Successfully complete the course in Attractor and find a good job',
            status: 'in_progress',
        },
        {
            user: userMolly._id,
            title: 'Make a cake',
            description: 'To buy ingredients and make a cake for Monday',
            status: 'new',
        },
        {
            user: userSally._id,
            title: 'Birthday party',
            description: null,
            status: 'new',
        },
        {
            user: userEmma._id,
            title: 'Laptop',
            description: null,
            status: 'new',
        }
    );
};

run().catch(console.error);