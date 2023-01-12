import type { IMongoDBConfig } from "src/interfaces/IMongoDBConfig";

export const mongodbConfig: IMongoDBConfig = {
    uri: 'mongodb://localhost:27017/',
    dbName: 'to_do_list_app_db'
};