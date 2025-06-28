import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { CollectionCreateComponent } from './movie-collection/collection-create/collection-create.component';
import { CollectionDetailsComponent } from './movie-collection/collection-details/collection-details.component';
import { MovieCollectionComponent } from './movie-collection/movie-collection.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CollectionRoutingModule } from './collection-routing-module';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [MovieCollectionComponent, CollectionCreateComponent, CollectionDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CollectionRoutingModule,

    MatDialogModule,
    MatMenuModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatFormField,

    SharedModule,
  ],
  exports: [MovieCollectionComponent],
})
export class CollectionsModule {}
