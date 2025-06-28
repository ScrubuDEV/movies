import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MovieItemComponent } from './features/movies/movie-item/movie-item.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MovieSearchComponent } from './features/movies/movie-search/movie-search.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchValidatorDirective } from './shared/validators/search-validator.directive';
import { MovieDetailComponent } from './features/movies/movie-detail/movie-detail.component';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatChip, MatChipListbox } from '@angular/material/chips';
import { MatSlider } from '@angular/material/slider';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDivider } from '@angular/material/divider';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { TruncateDecimalPipe } from './shared/pipes/turnicate/truncate-decimal.pipe';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './translate-loader';
import { MatToolbar } from '@angular/material/toolbar';
import { TruncatePipe } from './shared/pipes/turnicate/truncate.pipe';
import { MovieCollectionComponent } from './features/movie-collection/movie-collection.component';
import { ConfirmationDialogComponent } from './features/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { CollectionCreateComponent } from './features/movie-collection/collection-create/collection-create.component';
import { CollectionDetailsComponent } from './features/movie-collection/collection-details/collection-details.component';
import { MatMenu, MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    App,
    MovieItemComponent,
    MovieSearchComponent,
    MovieDetailComponent,
    MovieCollectionComponent,
    ConfirmationDialogComponent,
    CollectionCreateComponent,
    CollectionDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    MatMenu,
    MatMenuModule,
    MatDialogContent,
    MatDialogActions,
    MatFormField,
    MatToolbar,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatTooltip,
    MatChip,
    MatChipListbox,
    MatDivider,
    MatSlider,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSpinner,
    SearchValidatorDirective,
    TruncateDecimalPipe,
    TruncatePipe,
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideZonelessChangeDetection()],
  bootstrap: [App],
})
export class AppModule {}
