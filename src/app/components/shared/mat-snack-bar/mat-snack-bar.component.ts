import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

export enum SnackBarClass {
  BLUE = 'blue-snackbar',
  SUCCESS = 'success-snackbar',
  ERROR = 'error-snackbar'
}

@Component({
  selector: 'app-mat-snack-bar',
  templateUrl: './mat-snack-bar.component.html',
  styleUrls: ['./mat-snack-bar.component.scss']
})
export class MatSnackBarComponent {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, className?: SnackBarClass, action?: string, duration?: number) {
    this.snackBar.open(message, action, {
      duration: duration ? duration : undefined,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: className ? [className] : undefined,
    });
  }

  openSuccess(text: string) {
    this.openSnackBar(text, SnackBarClass.SUCCESS, undefined, 1500)
  }

  openError(message: string) {
    this.openSnackBar(message, SnackBarClass.ERROR, 'Close')
  } 
}
