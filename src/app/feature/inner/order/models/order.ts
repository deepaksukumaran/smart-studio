import { OrderPage } from './order-page.model';

export class Order {
    public id: number;
    public parentOrderId: number;
    public dueDate: string;
    public notes: string;
    public priority: string;
    public type: string;
    public subType: string;
    public status: string;
    public pages : OrderPage[];

    public customerId: string;
    public customerName: string;
    public email: string;
    public phone: string;

    public createdAt: string;
    public createdBy: number;
    public updatedAt: string;
    public updatedBy: number;
}
