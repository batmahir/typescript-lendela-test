export class Task {

    protected id: string; 
    protected title: string;
    protected completed : boolean;
    protected created_at: Date;

    constructor(id: string,title:string,completed: boolean, created_at: Date){
        this.id =id;
        this.title = title;
        this.completed = completed;
        this.created_at = created_at;
    }
    


}