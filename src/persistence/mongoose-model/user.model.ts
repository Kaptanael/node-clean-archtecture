import mongoose, { Schema, model } from 'mongoose'
import { UserEntity } from '../../domain/entities/user.entity';


const UserSchema = new Schema<UserEntity>(
    {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true
        },
        updatedAt: {
            type: Date,
            required: true
        }
    },
    { timestamps: true }
);

const User = model<UserEntity>('User', UserSchema);

export default User;