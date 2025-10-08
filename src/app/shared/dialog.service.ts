import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AlertDialogComponent, AlertDialogData } from './alert-dialog.component';
import { PromptDialogComponent, PromptDialogData } from './prompt-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  /**
   * Show an alert dialog (replacement for window.alert)
   */
  alert(message: string, title: string = 'Alert'): Observable<boolean> {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: {
        title,
        message,
        confirmText: 'OK'
      } as AlertDialogData,
      disableClose: true
    });

    return dialogRef.afterClosed();
  }

  /**
   * Show a success dialog
   */
  success(message: string, title: string = 'Success'): Observable<boolean> {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: {
        title,
        message,
        confirmText: 'OK'
      } as AlertDialogData,
      disableClose: true
    });

    return dialogRef.afterClosed();
  }

  /**
   * Show an error dialog
   */
  error(message: string, title: string = 'Error'): Observable<boolean> {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: {
        title,
        message,
        confirmText: 'OK'
      } as AlertDialogData,
      disableClose: true
    });

    return dialogRef.afterClosed();
  }

  /**
   * Show a prompt dialog (replacement for window.prompt)
   */
  prompt(
    message: string,
    title: string = 'Input Required',
    defaultValue: string = '',
    isTextarea: boolean = false
  ): Observable<string | null> {
    const dialogRef = this.dialog.open(PromptDialogComponent, {
      width: isTextarea ? '600px' : '400px',
      data: {
        title,
        message,
        defaultValue,
        placeholder: message,
        confirmText: 'OK',
        cancelText: 'Cancel',
        isTextarea
      } as PromptDialogData,
      disableClose: true
    });

    return dialogRef.afterClosed();
  }

  /**
   * Show a JSON input dialog
   */
  promptJson(
    message: string,
    title: string = 'JSON Input',
    defaultValue: string = ''
  ): Observable<string | null> {
    return this.prompt(message, title, defaultValue, true);
  }
}