// models/User.ts
import mongoose, { Document, Schema, Model } from "mongoose";
import { comparePasswords, hashPassword } from "../services/passwordSrv";

interface IUser extends Document {
    email: string;
    password: string;

        // Add comparePassword method to the IUser interface

    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Pre-save hook to hash the password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await hashPassword(this.password);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    return comparePasswords(candidatePassword, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export { User };
