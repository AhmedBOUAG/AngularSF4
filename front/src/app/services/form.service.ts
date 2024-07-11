import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class FormService {
    createForm(formControls: { [key: string]: any }[]): FormGroup {
        const formGroup = new FormGroup({});
        formControls.forEach(control => {
            const { key, value, validators } = control;
            formGroup.addControl(key, new FormControl(value || '', validators));
        });
        return formGroup;
    }

    populateForm(form: FormGroup, data: any): void {
        for (const key in data) {
            if (data.hasOwnProperty(key) && form.controls[key]) {
                form.controls[key].setValue(data[key]);
            }
        }
    }

    resetForm(form: FormGroup): void {
        form.reset();
    }
}
