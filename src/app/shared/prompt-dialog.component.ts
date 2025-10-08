import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface PromptDialogData {
  title: string;
  message: string;
  defaultValue?: string;
  placeholder?: string;
  confirmText?: string;
  cancelText?: string;
  isTextarea?: boolean;
}

@Component({
  selector: 'app-prompt-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    TextFieldModule,
    FormsModule
  ],
  template: `
    <div mat-dialog-content>
      <h2 mat-dialog-title>{{ data.title }}</h2>
      <p *ngIf="data.message" [innerHTML]="data.message"></p>
      
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>{{ data.placeholder || 'Enter value' }}</mat-label>
        <textarea 
          *ngIf="data.isTextarea; else inputTemplate"
          matInput
          [(ngModel)]="inputValue"
          [placeholder]="data.placeholder || ''"
          rows="10"
          cdkTextareaAutosize
          cdkAutosizeMinRows="10"
          cdkAutosizeMaxRows="20">
        </textarea>
        <ng-template #inputTemplate>
          <input 
            matInput
            [(ngModel)]="inputValue"
            [placeholder]="data.placeholder || ''"
            (keyup.enter)="onConfirm()">
        </ng-template>
      </mat-form-field>
    </div>
    
    <div mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">
        {{ data.cancelText || 'Cancel' }}
      </button>
      <button mat-raised-button color="primary" (click)="onConfirm()">
        {{ data.confirmText || 'OK' }}
      </button>
    </div>
  `,
  styles: [`
    [mat-dialog-content] {
      min-width: 400px;
      padding: 24px;
    }
    
    [mat-dialog-title] {
      margin: 0 0 16px 0;
      font-size: 20px;
      font-weight: 600;
      color: #1f2937;
    }
    
    p {
      margin: 0 0 16px 0;
      line-height: 1.5;
      color: #4b5563;
    }
    
    .full-width {
      width: 100%;
    }
    
    [mat-dialog-actions] {
      padding: 16px 24px 24px 24px;
      gap: 8px;
    }
    
    textarea {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 12px;
    }
  `]
})
export class PromptDialogComponent {
  inputValue: string;

  constructor(
    public dialogRef: MatDialogRef<PromptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PromptDialogData
  ) {
    this.inputValue = data.defaultValue || '';
  }

  onConfirm(): void {
    this.dialogRef.close(this.inputValue);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}