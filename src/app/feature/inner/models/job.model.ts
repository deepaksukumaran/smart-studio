import { Customer } from '../customer/models/customer.model';

// import { JobTask } from './job-task.model';

export class Job {
    public customer: Customer;
    // public task: JobTask;

    public orderDate: string;
    public deliveryDate: string;
    public orderTakenBy: string;
    public totalAmount: string;
    public advanceAmount: string;
    public balanceAmount: string;
    public totalPaid: string;
}
