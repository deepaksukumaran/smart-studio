import { PaginationParams } from '@shared/models/pagination-params.model';

export class OrderFilterParams extends PaginationParams {
    public custName: string;
    public dueDate: string;
    public email: string;
    public phone: string;
    public present: string;
    public priority: string;
    public status: string;
}
