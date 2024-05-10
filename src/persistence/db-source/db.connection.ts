import { ICacheDatasource } from './cache.datasource';
import { IDBDatasource } from './db.datasource';
import { container } from '../../di/container';
import { Types } from '../../di/types';


const db: IDBDatasource = container.get(Types.IDBDatasource)
const cacheDb: ICacheDatasource = container.get(Types.ICacheDatasource)

export const connectDb = async () => {
  try {
    const isConnected = await db.connectDb();
    return isConnected;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export const connectCacheDb = async () => {
  try {
    const isConnected = await cacheDb.connectDb();
    return isConnected;
  } catch (err) {
    console.error(err);
    return false;
  }
}
