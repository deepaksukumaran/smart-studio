import { KeyValue } from '@angular/common';

export class EmployeeConstants {
    public static genderList: KeyValue<string, string>[] = [
        { key: '', value: '--' },
        { key: 'Male', value: 'Male' },
        { key: 'Female', value: 'Female' },
    ];

    public static stateList: KeyValue<string, string>[] = [
        { key: '', value: '--' },
        { key: 'KL', value: 'Kerala' },
    ];
}
