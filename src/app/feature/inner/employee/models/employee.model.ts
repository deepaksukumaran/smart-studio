import { EmployeePosition } from '../../other/models/employee-position.model';
import { EmployeeAddress } from './employee-address.model';

export class Employee {
    public id: number;
    public employeeNo: string;

    public firstName: string;
    public lastName: string;
    public gender: string;
    public phone: string;
    public email: string;
    public addresses: EmployeeAddress[];
    public positions: EmployeePosition[];

    public userName: string;
    public password: string;

    public dob: string;
    public doj: string;
    public dot: string;

    public status: string;
    public createdAt: string;
    public createdBy: number;
    public updatedAt: string;
    public updatedBy: number;
}
