import { MongoDb } from "../databases/MongoDb";
import { consoleError } from "../utils/helpers";

export class Task {

    protected id: string;
    protected title: string;
    protected completed: boolean;
    protected created_at: Date;

    constructor(id: string, title: string, completed: boolean, created_at: Date) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        this.created_at = created_at;
    }


    protected createRecord = async (record : object ) => {

        try {
            await MongoDb.connect();
            await MongoDb.insertRecord("users", record);
            await MongoDb.close();

        } catch (error : unknown ) {
            consoleError(error);
        }


    }


    protected updateRecord = async(collectionName : string,userId : string, updatedValues : object  ) => {

        try {
            await Mongodb.connect();
            await Mongodb.updateRecord( collectionName, userId, updatedValues);
            await Mongodb.close();

        } catch (error :unknown) {
            consoleError(error);
           
        }
    }

    protected fetchAllRecords = async (collectionName: string) => {

        try {

            await Mongodb.connect();
            const records = await Mongodb.fetchAllRecords(collectionName);
            await Mongodb.close();
    
            return records;

        }catch(error) {
            
            consoleError(error);
        }
      

    };



    protected deleteRecord = async (ids : string[]) => {

        try {

            await Mongodb.connect();
            await Mongodb.deleteRecords("users", ids);
            await Mongodb.close();
        }
        catch(error: unknown){
            consoleError(error);
        }

    }


}