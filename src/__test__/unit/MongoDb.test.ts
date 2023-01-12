import { MongoDb } from "../../databases/MongoDb";
import { MongoClient } from 'mongodb';

describe('MongoDb', () => {

    let mongoDb : MongoDb; 

    beforeAll(() => {
        mongoDb = new MongoDb();
    });

    it('should connect to the MongoDB server', async () => {
        const client = await mongoDb.connect();
        expect(client).toBeInstanceOf(MongoClient);
    
    });
    
    afterAll(async () => {
        await mongoDb.close();
    });
    

  });