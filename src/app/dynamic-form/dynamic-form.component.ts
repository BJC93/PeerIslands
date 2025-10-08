import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormField, JsonFormConfig, FormFieldType, JsonFieldType } from '../shared/dynamic-form.interfaces';

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() jsonConfig: JsonFormConfig | null = null;
  @Input() submitButtonText: string = 'Submit';
  @Input() resetButtonText: string = 'Reset';
  @Input() showResetButton: boolean = true;
  
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formReset = new EventEmitter<void>();
  @Output() formChange = new EventEmitter<any>();

  dynamicForm!: FormGroup;
  formTitle: string = '';
  currentFields: FormField[] = []; // Cache the current fields

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Only recreate form if the configuration inputs have changed
    if (changes['jsonConfig']) {
      this.createForm();
    }
  }

  private createForm() {
    let fieldsToUse: FormField[] = [];
    if (this.jsonConfig) {
      fieldsToUse = this.convertJsonToFields(this.jsonConfig);
      this.formTitle = this.jsonConfig.title || '';
    } else {
      fieldsToUse = [];
    }

    // Cache the current fields to prevent recreation on every change detection
    this.currentFields = fieldsToUse;

    const formControls: { [key: string]: FormControl } = {};

    fieldsToUse.forEach(field => {
      const validators = this.getValidators(field);
      let defaultValue = field.value;

      if (defaultValue === undefined) {
        switch (field.type) {
          case FormFieldType.CHECKBOX:
            defaultValue = false;
            break;
          case FormFieldType.MULTISELECT:
            defaultValue = [];
            break;
          default:
            defaultValue = '';
        }
      }
      
      formControls[field.key] = new FormControl({
        value: defaultValue,
        disabled: field.disabled || false
      }, validators);
    });

    this.dynamicForm = this.fb.group(formControls);

    this.dynamicForm.valueChanges.subscribe(value => {
      // this.formChange.emit(value);
    });
  }

  convertJsonToFields(jsonConfig: JsonFormConfig): FormField[] {
    return jsonConfig.fields.map(jsonField => {
      const field: FormField = {
        key: jsonField.name,
        type: this.mapJsonTypeToFieldType(jsonField.type),
        label: jsonField.label,
        required: jsonField.required || false,
        placeholder: jsonField.placeholder || '',
        disabled: jsonField.disabled || false,
        value: jsonField.value
      };

      if (jsonField.options) {
        field.options = (jsonField.options as string[]).map(option => ({
          value: option.toLowerCase().replace(/\s+/g, '_'),
          label: option
        }));
      }

      if (jsonField.validation) {
        field.validators = this.getValidatorsFromJson(jsonField.validation);
      }

      return field;
    });
  }

  private mapJsonTypeToFieldType(jsonType: string): FormFieldType {
    const typeMap: { [key: string]: FormFieldType } = {
      [JsonFieldType.TEXT]: FormFieldType.TEXT,
      [JsonFieldType.EMAIL]: FormFieldType.EMAIL,
      [JsonFieldType.PASSWORD]: FormFieldType.PASSWORD,
      [JsonFieldType.NUMBER]: FormFieldType.NUMBER,
      [JsonFieldType.DATE]: FormFieldType.DATE,
      [JsonFieldType.TEXTAREA]: FormFieldType.TEXTAREA,
      [JsonFieldType.CHECKBOX]: FormFieldType.CHECKBOX,
      [JsonFieldType.DROPDOWN]: FormFieldType.SELECT,
      [JsonFieldType.SELECT]: FormFieldType.SELECT,
      [JsonFieldType.MULTISELECT]: FormFieldType.MULTISELECT,
      [JsonFieldType.RADIO]: FormFieldType.RADIO
    };

    return typeMap[jsonType] || FormFieldType.TEXT;
  }

  private getValidatorsFromJson(validation: any): any[] {
    const validators = [];

    if (validation.pattern) {
      validators.push(Validators.pattern(validation.pattern));
    }
    if (validation.min !== undefined) {
      validators.push(Validators.min(validation.min));
    }
    if (validation.max !== undefined) {
      validators.push(Validators.max(validation.max));
    }
    if (validation.minLength !== undefined) {
      validators.push(Validators.minLength(validation.minLength));
    }
    if (validation.maxLength !== undefined) {
      validators.push(Validators.maxLength(validation.maxLength));
    }

    return validators;
  }

  private getValidators(field: FormField) {
    const validators = [];

    if (field.required) {
      validators.push(Validators.required);
    }

    if (field.type === FormFieldType.EMAIL) {
      validators.push(Validators.email);
    }

    if (field.validators) {
      validators.push(...field.validators);
    }

    return validators;
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      this.formSubmit.emit(this.dynamicForm.value);
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  onReset() {
    this.dynamicForm.reset();
    Object.keys(this.dynamicForm.controls).forEach(key => {
      const field = this.getFieldByKey(key);
      let defaultValue = field?.value;
      
      if (defaultValue === undefined) {
        switch (field?.type) {
          case FormFieldType.CHECKBOX:
            defaultValue = false;
            break;
          case FormFieldType.MULTISELECT:
            defaultValue = [];
            break;
          default:
            defaultValue = '';
        }
      }
      
      this.dynamicForm.get(key)?.setValue(defaultValue);
    });
    this.formReset.emit();
  }

  private getFieldByKey(key: string): FormField | undefined {
    if (this.jsonConfig) {
      const config = this.jsonConfig!;
      const fields = this.convertJsonToFields(config);
      return fields.find(f => f.key === key);
    }
    return undefined;
  }

  private markAllFieldsAsTouched() {
    Object.keys(this.dynamicForm.controls).forEach(key => {
      this.dynamicForm.get(key)?.markAsTouched();
    });
  }

  getFieldError(fieldKey: string): string | null {
    const field = this.dynamicForm.get(fieldKey);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldKey)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['pattern']) {
        return this.getCustomValidationMessage(fieldKey) || 'Invalid format';
      }
      if (field.errors['min']) {
        return `Minimum value is ${field.errors['min'].min}`;
      }
      if (field.errors['max']) {
        return `Maximum value is ${field.errors['max'].max}`;
      }
      if (field.errors['minlength']) {
        return `Minimum length is ${field.errors['minlength'].requiredLength}`;
      }
      if (field.errors['maxlength']) {
        return `Maximum length is ${field.errors['maxlength'].requiredLength}`;
      }
    }
    return null;
  }

  private getCustomValidationMessage(fieldKey: string): string | null {
    if ( this.jsonConfig) {
      let config: JsonFormConfig;
      config = this.jsonConfig!;
      const jsonField = config.fields.find(f => f.name === fieldKey);
      return jsonField?.validation?.message || null;
    }
    return null;
  }

  private getFieldLabel(fieldKey: string): string {
    const field = this.getFieldByKey(fieldKey);
    return field?.label || fieldKey;
  }

  isFieldInvalid(fieldKey: string): boolean {
    const field = this.dynamicForm.get(fieldKey);
    return !!(field && field.invalid && field.touched);
  }

  isOptionSelected(fieldKey: string, optionValue: any): boolean {
    const fieldValue = this.dynamicForm.get(fieldKey)?.value || [];
    return fieldValue.includes(optionValue);
  }

  toggleMultiselectOption(fieldKey: string, optionValue: any) {
    const currentValue = this.dynamicForm.get(fieldKey)?.value || [];
    const newValue = currentValue.includes(optionValue)
      ? currentValue.filter((val: any) => val !== optionValue)
      : [...currentValue, optionValue];
    
    this.dynamicForm.get(fieldKey)?.setValue(newValue);
  }

  getFieldOptions(field: FormField): { value: any; label: string }[] {
    if (!field.options) return [];
    return field.options;
  }

  getCurrentFields(): FormField[] {
    return this.currentFields;
  }
}
