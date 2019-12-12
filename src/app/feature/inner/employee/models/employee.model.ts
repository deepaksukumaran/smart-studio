import { EmployeeAddress } from './employee-address.model';

export class Employee {
    public id: number;
    public employeeNo: string;

    public firstName: string;
    public lastName: string;
    public gender: string;
    public positions: string[];
    public addresses: EmployeeAddress[];
    public phone: string;
    public email: string;

    public userName: string;
    public password: string;

    public dob: string;
    public doj: string;
    public dot: string;

    public status: string;
    public createdAt: string;
    public createdBy: string;
    public updatedAt: string;
    public updatedBy: string;
}
