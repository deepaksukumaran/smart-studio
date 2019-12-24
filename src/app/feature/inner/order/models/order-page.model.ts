import { OrderPageDetails } from './order-page-details.model';

export class OrderPage {
    public id: number;
    public orderId: number;
    public pageNo: number;
    public comments: string;
    public pageDetails: OrderPageDetails;

    public createdAt: string;
    public createdBy: number;
    public updatedAt: string;
    public updatedBy: number;
}
