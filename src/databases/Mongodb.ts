import * as Mongo from 'mongodb';

export class Mongodb{

    static client: Mongo.MongoClient;
    static db: Mongo.Db;

    static async connect() {
        try {
            this.client = await Mongo.MongoClient.connect(
                "mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority",
                { useNewUrlParser: true, useUnifiedTopology: true }
            );
            this.db = this.client.db();
            console.log("MongoDB Connected");
        } catch (err) {
            console.log(err.message);
        }
    }

    static async close() {
        if (this.client) {
            await this.client.close();
            console.log("MongoDB connection closed");
        }
    }

    static async insertRecord(collectionName:string,record:object){
        try{
            const collection = this.db.collection(collectionName);
            await collection.insertOne(record);
            console.log("Record inserted successfully!");
        }catch(error){
            console.log(error.message);
        }
    }

    static async insertRecords(collectionName:string, records: object[]) {
        try {
            const collection = this.db.collection(collectionName);
            await collection.insertMany(records);
            console.log(`${records.length} records inserted successfully!`);
        } catch (error) {
            console.log(error.message);
        }
    }

    static async deleteRecords(collectionName:string, ids:string[]) {
        try {
            const collection = this.db.collection(collectionName);
            const filter = { _id: { $in: ids.map(id => Mongo.ObjectId(id)) } };
            const result = await collection.deleteMany(filter);
            console.log(`${result.deletedCount} records deleted successfully!`);
        } catch (error) {
            console.log(error.message);
        }
    }

    static async updateRecord(collectionName:string, id:string, updatedValues:object): Promise<void> {
        
        try {
            const collection = this.db.collection(collectionName);
            await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedValues });
        } catch (error) {
            console.log(error.message);
        }
    }

    static async fetchAllRecords(collectionName:string) {
        try {
            const collection = this.db.collection(collectionName);
            const records = await collection.find({}).toArray();
            return records;
        } catch (error) {
            console.log(error.message);
        }
    }
 
}