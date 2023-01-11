export interface DatabaseInterface {
    
    connect(): Promise<void>;
    close(): Promise<void>;
    insertRecord(collectionName:string,record:object):Promise<void>;
    insertRecords(collectionName:string, records: object[]): Promise<void>;
    deleteRecords(collectionName:string, ids:string[]): Promise<void>;
    fetchAllRecords(collectionName:string): Promise<object[]>;
}