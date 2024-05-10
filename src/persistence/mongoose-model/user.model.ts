import mongoose, { Schema, model } from 'mongoose'
import { UserEntity } from '../../domain/entities/user.entity';



const UserSchema = new Schema<UserEntity>(
    {
        email: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        }        
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

UserSchema.pre<UserEntity>('save', async (next)=>{
    console.log('pre save');    
    next();
});

const User = model<UserEntity>('User', UserSchema);

export default User;