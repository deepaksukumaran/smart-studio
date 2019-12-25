import { OrderPage } from './order-page.model';

export class Order {
    public id: number;
    public parentOrderId: number;
    public type: string; // album/momento
    public subTyte: string;
    public notes: string; // 
    public dueDate: string;
    public priority: string; // normal/medium/high
    public pages: OrderPage[];
    public status: string;

    public customerId: string;
    public customerName: string;
    public email: string;
    public phone: string;

    public createdAt: string;
    public createdBy: number;
    public updatedAt: string;
    public updatedBy: number;
}
