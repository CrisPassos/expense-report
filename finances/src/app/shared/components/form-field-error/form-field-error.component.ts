import { FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent {

  @Input('form-control') formControl: FormControl;

  public get errorMessage(): string | null {
    if (this.formControl.invalid && this.formControl.touched) {
      return this.getErrorMessage();
    } else {
      return null;
    }
  }

  private getErrorMessage(): string | null {
    if (this.formControl.errors.required) {
      return 'Required Input';
    } else if (this.formControl.errors.minlength) {
      const requiredLenght = this.formControl.errors.minlength.requiredLength;
      return `Min Lenght is: ${requiredLenght} characters`;
    } else if (this.formControl.errors.email) {
      return 'Email invalid';
    }
  }

}
