export enum FormFieldType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  NUMBER = 'number',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  TEXTAREA = 'textarea',
  RADIO = 'radio',
  DATE = 'date',
  DROPDOWN = 'dropdown',
  MULTISELECT = 'multiselect'
}

export enum JsonFieldType {
  TEXT = 'text',
  EMAIL = 'email',
  PASSWORD = 'password',
  NUMBER = 'number',
  DATE = 'date',
  TEXTAREA = 'textarea',
  CHECKBOX = 'checkbox',
  DROPDOWN = 'dropdown',
  SELECT = 'select',
  MULTISELECT = 'multiselect',
  RADIO = 'radio'
}

export interface FormField {
  key: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: any; label: string }[];
  validators?: any[];
  disabled?: boolean;
  value?: any;
}

export interface JsonFormConfig {
  title?: string;
  fields: JsonField[];
}

export interface JsonField {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  options?: string[];
  validation?: {
    pattern?: string;
    message?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
  };
  placeholder?: string;
  disabled?: boolean;
  value?: any;
}
