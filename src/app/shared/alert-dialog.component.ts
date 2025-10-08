import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface AlertDialogData {
  title: string;
  message: string;
  confirmText?: string;
}

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div mat-dialog-content>
      <h2 mat-dialog-title>{{ data.title }}</h2>
      <p [innerHTML]="data.message"></p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="onConfirm()">
        {{ data.confirmText || 'OK' }}
      </button>
    </div>
  `,
  styles: [`
    [mat-dialog-content] {
      min-width: 300px;
      padding: 24px;
    }
    
    [mat-dialog-title] {
      margin: 0 0 16px 0;
      font-size: 20px;
      font-weight: 600;
      color: #1f2937;
    }
    
    p {
      margin: 0;
      line-height: 1.5;
      color: #4b5563;
    }
    
    [mat-dialog-actions] {
      padding: 16px 24px 24px 24px;
    }
  `]
})
export class AlertDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}