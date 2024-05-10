import { UserEntity } from "../entities/user.entity";


export interface IUserRepository {

    findAll(): Promise<UserEntity[]>;        

    findById(id: string): Promise<UserEntity | null>;    

    create(user: UserEntity): Promise<UserEntity>;

    update(id: string, user: UserEntity):Promise<UserEntity | null>;    

    delete(id: string): Promise<void>         

}