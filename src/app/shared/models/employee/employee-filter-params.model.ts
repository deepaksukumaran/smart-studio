import { PaginationParams } from '../pagination-params.model';

export class EmployeeFilterParams extends PaginationParams {
    public firstName: string;
    public lastName: string;
    public sortBy: string;
}
