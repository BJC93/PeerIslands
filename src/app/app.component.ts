import { Component } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { JsonFormConfig } from './shared/dynamic-form.interfaces';
import { CommonModule } from '@angular/common';
import { DialogService } from './shared/dialog.service';

@Component({
  selector: 'app-root',
  imports: [DynamicFormComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PeerIslands - Dynamic JSON Form Demo';

  constructor(private dialogService: DialogService) {}

  jsonFormConfig: JsonFormConfig = {
    "title": "User Registration",
    "fields": [
        {
            "label": "Full Name",
            "name": "fullName",
            "type": "text",
            "required": true
        },
        {
            "label": "Email",
            "name": "email",
            "type": "text",
            "required": true,
            "validation": {
                "pattern": "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
                "message": "Invalid email address"
            }
        },
        {
            "label": "Date of Birth",
            "name": "dob",
            "type": "date"
        },
        {
            "label": "Gender",
            "name": "gender",
            "type": "dropdown",
            "options": [
                "Male",
                "Female",
                "Other"
            ],
            "required": true
        },
        {
            "label": "Hobbies",
            "name": "hobbies",
            "type": "multiselect",
            "options": [
                "Reading",
                "Sports",
                "Music",
                "Travel"
            ]
        },
        {
            "label": "Subscribe to newsletter",
            "name": "subscribe",
            "type": "checkbox"
        },
        {
            "label": "About Yourself",
            "name": "about",
            "type": "textarea"
        }
    ]
  };

  onFormSubmit(formData: any) {
    console.log('Form submitted with data:', formData);
    this.dialogService.success(
      'Form submitted successfully!<br>Check the browser console for details.',
      'Success'
    ).subscribe();
  }

  onFormReset() {
    console.log('Form has been reset');
  }

  onFormChange(formData: any) {
    console.log('Form data changed:', formData);
  }

  loadCustomJson() {
    const defaultJson = JSON.stringify(this.jsonFormConfig, null, 2);
    
    this.dialogService.promptJson(
      'Enter your JSON configuration:',
      'Load Custom JSON Configuration',
      defaultJson
    ).subscribe(customJson => {
      if (customJson) {
        try {
          const parsedConfig = JSON.parse(customJson);
          this.jsonFormConfig = parsedConfig;
          this.dialogService.success(
            'JSON configuration loaded successfully!',
            'Success'
          ).subscribe();
        } catch (error) {
          this.dialogService.error(
            'Invalid JSON format. Please check your JSON syntax and try again.',
            'JSON Parse Error'
          ).subscribe();
        }
      }
    });
  }

  getCurrentJsonDisplay(): string {
    return JSON.stringify(this.jsonFormConfig, null, 2);
  }
}
