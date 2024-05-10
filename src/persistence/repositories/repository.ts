import { Document, Model, Types } from 'mongoose';
import { IRepository } from '../../domain/repositories/repository';


export class MongooseRepository<T extends Document> implements IRepository<T> {

    constructor(private model: Model<T>) { }

    async findAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    async create(item: T): Promise<T> {
        return this.model.create(item);
    }

    async update(id: string, item: any): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, item, { new: true }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.model.findByIdAndDelete(id).exec();
    }

}
