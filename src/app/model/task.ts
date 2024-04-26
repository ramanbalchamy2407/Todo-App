export interface ITask {
  itemId: number;
  taskName: string;
  taskDescription: string;
  dueDate: Date;
  createdOn: Date;
  isCompleted: boolean;
  tags: string;
  completedOn: Date;
}

export class Task {
    itemId: number;
    taskName: string;
    taskDescription: string;
    dueDate: Date;
    createdOn: Date;
    isCompleted: boolean;
    tags: string;
    completedOn: Date;

    constructor(){
        this.itemId=0;
        this.taskName='';
        this.taskDescription='';
        this.completedOn=new Date();
        this.createdOn=new Date();
        this.dueDate= new Date();
        this.tags='';
        this.isCompleted=false;
        

    }
  }
export interface ApiResponseModel{
    message: string;
    result: string;
    data: any;
}