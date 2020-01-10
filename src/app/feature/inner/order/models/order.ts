import { OrderPage } from './order-page.model';

export class Order {
    public id: number;
    public parentOrderId: number;
    public type: string; // album/momento
    public subType: string; public dueDate: string;
    public priority: string; // normal/medium/high
    public status: string;
    public category: string;
    public size: string;
    public coverType: string;
    public bagType: string;
    public pages: OrderPage[];
    public notes: string; // 

    public customerId: number;
    public customerName: string;
    public email: string;
    public phone: string;

    public createdAt: string;
    public createdBy: number;
    public updatedAt: string;
    public updatedBy: number;
}

