import mongoose, {Model} from "mongoose";
import {UserData} from "../types";
import {randomUUID} from "node:crypto";
import bcrypt from "bcrypt";

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}

type UserModel = Model<UserData, {}, UserMethods>;

const Schema = mongoose.Schema;

const  HASHING_PASSWORD = 10;


const UserSchema = new Schema<UserData, UserModel, UserMethods>({
    username: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    token: {
        type: String,
        required: [true, 'Token is required'],
    }
});

UserSchema.pre("save", async function (next) {

    if (!this.isModified("password")) return next();

    const hashingPassword = await bcrypt.genSalt(HASHING_PASSWORD);

    this.password = await bcrypt.hash(this.password, hashingPassword);
    next();
});

UserSchema.methods.checkPassword = function (password:string) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
};

UserSchema.set('toJSON', {
    transform: (_doc, ret, _options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model("User", UserSchema);
export default User;