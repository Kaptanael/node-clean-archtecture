import { Container } from 'inversify';
import 'reflect-metadata';
import { Types } from './types';
import { IDBDatasource, MongoDbDatasource } from '../persistence/db-source/db.datasource';
import { ICacheDatasource, CacheDatasource } from '../persistence/db-source/cache.datasource';
import { IUserRepository } from '../domain/repositories/user.repository';
import { UserRepository } from '../persistence/repositories/user.repository';
import UserController from '../application/controllers/user.controller';


export const container = new Container({ defaultScope: 'Singleton' });

container.bind<IDBDatasource>(Types.IDBDatasource).to(MongoDbDatasource);
container.bind<ICacheDatasource>(Types.ICacheDatasource).to(CacheDatasource);

container.bind<IUserRepository>(Types.IUserRepository).to(UserRepository);

container.bind<UserController>(Types.UserController).to(UserController)
