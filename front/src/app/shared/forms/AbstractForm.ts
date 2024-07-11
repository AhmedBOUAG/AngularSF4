import { FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';

export abstract class AbstractForm {
    form: FormGroup;

    constructor(private formService: FormService, formControls: { key: string; value?: any; validators?: any[] }[]) {
        this.form = this.formService.createForm(formControls);
    }

    populateForm(data: any) {
        this.formService.populateForm(this.form, data);
    }

    resetForm() {
        this.formService.resetForm(this.form);
    }
}
