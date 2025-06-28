import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { SearchValidatorDirective } from './validators/search-validator.directive';
import { TruncateDecimalPipe } from './pipes/turnicate/truncate-decimal.pipe';
import { TruncatePipe } from './pipes/turnicate/truncate.pipe';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    MatButtonModule,
    TruncatePipe,
    TruncateDecimalPipe,
    SearchValidatorDirective,
    MatFormFieldModule,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    MatButtonModule,
    MatFormField,
    ConfirmationDialogComponent,
    TruncatePipe,
    TruncateDecimalPipe,
    SearchValidatorDirective,
  ],
})
export class SharedModule {}
