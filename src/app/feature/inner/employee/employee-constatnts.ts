import { KeyValue } from '@angular/common';

export class EmployeeConstants {
    public static genderList: KeyValue<string, string>[] = [
        { key: '', value: '--' },
        { key: 'Male', value: 'Male' },
        { key: 'Female', value: 'Female' },
    ];

    public static stateList: KeyValue<string, string>[] = [
        { key: '', value: '--' },
        { key: 'Kerala', value: 'Kerala' },
    ];

    public static countryList: KeyValue<string, string>[] = [
        { key: '', value: '--' },
        { key: 'India', value: 'India' },
    ];
}
