# PeerIslands - Dynamic JSON Form

A comprehensive Angular application featuring a dynamic reactive form component that generates forms from JSON configuration. Built with Angular 19, Angular Material, and TypeScript.

## Features

- 🚀 **Dynamic Form Generation** - Create forms from JSON configuration
- 📝 **11 Field Types** - Support for text, email, password, number, select, checkbox, textarea, radio, date, dropdown, and multiselect
- ✅ **Comprehensive Validation** - Built-in and custom validators with user-friendly error messages
- 🎨 **Angular Material UI** - Modern Material Design components with animations
- 🔄 **Reactive Forms** - Built on Angular Reactive Forms for optimal performance
- 📱 **Responsive Design** - Works seamlessly across all device sizes
- 🎯 **Type Safety** - Full TypeScript support with enums and interfaces

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+
- Angular CLI 19+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BJC93/PeerIslands.git
   cd PeerIslands
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

### Build for Production

```bash
npm run build
# or
ng build --configuration production
```

## JSON Schema Format

The dynamic form accepts JSON configuration with the following structure:

### Basic Schema Structure

```json
{
  "title": "Form Title (optional)",
  "fields": [
    {
      "label": "Field Label",
      "name": "fieldKey",
      "type": "fieldType",
      "required": true,
      "placeholder": "Placeholder text",
      "disabled": false,
      "value": "default value",
      "options": ["option1", "option2"],
      "validation": {
        "pattern": "regex pattern",
        "message": "Custom error message",
        "min": 0,
        "max": 100,
        "minLength": 2,
        "maxLength": 50
      }
    }
  ]
}
```

### Supported Field Types

| Type | Description | Options Required |
|------|-------------|------------------|
| `text` | Single line text input | No |
| `email` | Email input with validation | No |
| `password` | Password input (masked) | No |
| `number` | Numeric input | No |
| `date` | Date picker | No |
| `textarea` | Multi-line text input | No |
| `checkbox` | Single checkbox | No |
| `radio` | Radio button group | Yes |
| `select` | Dropdown selection | Yes |
| `dropdown` | Alias for select | Yes |
| `multiselect` | Multiple selection checkboxes | Yes |

### Field Properties

#### Required Properties
- `label` (string) - Display label for the field
- `name` (string) - Unique identifier for the field
- `type` (string) - Field type from the supported types above

#### Optional Properties
- `required` (boolean) - Whether the field is required (default: false)
- `placeholder` (string) - Placeholder text for input fields
- `disabled` (boolean) - Whether the field is disabled (default: false)
- `value` (any) - Default value for the field
- `options` (string[]) - Array of options for select/radio/multiselect fields

#### Validation Object Properties
- `pattern` (string) - Regular expression pattern
- `message` (string) - Custom error message for pattern validation
- `min` (number) - Minimum value for number fields
- `max` (number) - Maximum value for number fields
- `minLength` (number) - Minimum length for text fields
- `maxLength` (number) - Maximum length for text fields

## Example JSON Configurations

### Basic Contact Form

```json
{
  "title": "Contact Information",
  "fields": [
    {
      "label": "Full Name",
      "name": "fullName",
      "type": "text",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "label": "Email Address",
      "name": "email",
      "type": "email",
      "required": true,
      "placeholder": "your.email@example.com"
    },
    {
      "label": "Phone Number",
      "name": "phone",
      "type": "text",
      "validation": {
        "pattern": "^[+]?[1-9]?[0-9]{7,15}$",
        "message": "Please enter a valid phone number"
      }
    },
    {
      "label": "Message",
      "name": "message",
      "type": "textarea",
      "required": true,
      "placeholder": "Your message here..."
    }
  ]
}
```

### Advanced User Registration

```json
{
  "title": "User Registration",
  "fields": [
    {
      "label": "Username",
      "name": "username",
      "type": "text",
      "required": true,
      "validation": {
        "minLength": 3,
        "maxLength": 20,
        "pattern": "^[a-zA-Z0-9_]+$",
        "message": "Username can only contain letters, numbers, and underscores"
      }
    },
    {
      "label": "Password",
      "name": "password",
      "type": "password",
      "required": true,
      "validation": {
        "minLength": 8,
        "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$",
        "message": "Password must contain at least 8 characters with uppercase, lowercase, and number"
      }
    },
    {
      "label": "Age",
      "name": "age",
      "type": "number",
      "required": true,
      "validation": {
        "min": 18,
        "max": 120
      }
    },
    {
      "label": "Gender",
      "name": "gender",
      "type": "radio",
      "required": true,
      "options": ["Male", "Female", "Other", "Prefer not to say"]
    },
    {
      "label": "Country",
      "name": "country",
      "type": "select",
      "required": true,
      "options": ["United States", "Canada", "United Kingdom", "Australia", "Other"]
    },
    {
      "label": "Interests",
      "name": "interests",
      "type": "multiselect",
      "options": ["Technology", "Sports", "Music", "Travel", "Reading", "Gaming"]
    },
    {
      "label": "Newsletter Subscription",
      "name": "newsletter",
      "type": "checkbox",
      "value": true
    }
  ]
}
```

## Example Output

When a form is submitted, the component emits a structured object with all field values:

### Contact Form Output
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "message": "Hello, I'm interested in your services."
}
```

### Registration Form Output
```json
{
  "username": "johndoe123",
  "password": "SecurePass123",
  "age": 28,
  "gender": "male",
  "country": "united_states",
  "interests": ["technology", "sports", "travel"],
  "newsletter": true
}
```

## Project Structure

```
src/
├── app/
│   ├── dynamic-form/
│   │   ├── dynamic-form.component.ts    # Main form component
│   │   ├── dynamic-form.component.html  # Form template
│   │   └── dynamic-form.component.css   # Form styles
│   ├── shared/
│   │   ├── dynamic-form.interfaces.ts   # TypeScript interfaces and enums
│   │   ├── dialog.service.ts            # Material dialog service
│   │   ├── alert-dialog.component.ts    # Alert dialog component
│   │   └── prompt-dialog.component.ts   # Prompt dialog component
│   ├── app.component.ts                 # Demo application
│   └── app.config.ts                    # App configuration
├── form-configs/                        # Sample JSON form configurations
│   ├── contact-form.json                # Contact us form example
│   ├── event-registration.json          # Event registration form
│   ├── employee-onboarding.json         # Employee onboarding form
│   ├── customer-survey.json             # Customer feedback survey
│   └── product-order.json               # Product order form
└── ...
```

## Technologies Used

- **Angular 19.2.0** - Latest Angular framework
- **Angular Material 19.0.0** - Material Design components
- **Angular Reactive Forms** - Form building and validation
- **TypeScript 5.6+** - Type-safe development
- **RxJS** - Reactive programming

```
