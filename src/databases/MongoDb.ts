import { MongoClient, MongoClientOptions } from 'mongodb';
// import { IMongoDBConfig } from 'src/interfaces/IMongoDBConfig';
import { mongodbConfig } from '../configs/mongodb.config';
import { consoleError } from '../utils/helpers';

export class MongoDb {

    private client: MongoClient;
    public db: any;

    constructor() {

        this.client = new MongoClient(mongodbConfig.uri );
    }

    async connect(): Promise<MongoClient> {
        try {
            await this.client.connect();
            this.db = this.client.db(mongodbConfig.dbName);
            console.log("Connected to MongoDB");
            
        } catch (error) {
            console.error(error);
        }

        return this.client;
    }

    async close(): Promise<void> {
        await this.client.close();
    }
 
}