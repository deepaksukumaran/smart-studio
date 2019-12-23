export class Order {
    public id: number;
    public parentOrderId: number;
    public dueDate: string;
    public notes: string;
    public priority: string;
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
