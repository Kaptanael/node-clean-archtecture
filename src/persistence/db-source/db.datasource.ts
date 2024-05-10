import { injectable } from 'inversify';
import { connect } from 'mongoose';
import { config } from '../../config';


export interface IDBDatasource {
  connectDb(): Promise<Boolean>
}

@injectable()
export class MongoDbDatasource implements IDBDatasource {
  connectDb(): Promise<Boolean> {
    const isConnected = new Promise<Boolean>(async (resolve, reject) => {
      try {
        const url: string = config.MONGODB_URL || '';
        const connected = await connect(url);
        if (connected) {
          console.log('Database connected successfully.');
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (err) {
        console.error('DB connection error:', err);
        reject(false);
      }
    })

    return isConnected;
  }
}