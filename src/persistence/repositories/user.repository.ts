import { injectable } from "inversify";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { IUserRepository } from "../../domain/repositories/user.repository";
import { UserEntity } from "../../domain/entities/user.entity";
import User from "../mongoose-model/user.model";


@injectable()
export class UserRepository implements IUserRepository {

    async findAll(): Promise<UserEntity[]> {
        const users = await User.find().exec();
        return users;
    }

    async findById(id: string): Promise<UserEntity | null> {
        const user = await User.findById({ _id: id }).exec();
        return user;
    }

    async create(user: UserEntity): Promise<UserEntity> {
        const newUser = await User.create(user);
        return newUser;
    }

    async update(id: string, user: UserEntity):Promise<UserEntity | null> {
        const updatedUser = await User.findByIdAndUpdate({_id:id}, user, { new: true }).exec();;
        return updatedUser;
    }

    async delete(id: string): Promise<void> {
        const user = await User.findByIdAndDelete(id).exec();        
    }

}