export interface ILanguages {
    id?: number;
    language: string;
}

export interface IEmployee {
     id?: number;
     lastName: string;
     firstName: string;
     birthDate: Date;
     jobPosition: string;
     departmentId:number;
     department?:string;
     contracts?: number[];
}

export interface IContract{
    id?:number;
    name:string;
    startDate:Date;
    endDate:Date;
    amount:number;
    employeeId:number;
    employee?:string
}

export interface IPosition{
    name:string,
    description:string;
}