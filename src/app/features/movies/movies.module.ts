import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSliderModule } from "@angular/material/slider";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TruncateDecimalPipe } from "../../shared/pipes/turnicate/truncate-decimal.pipe";
import { TruncatePipe } from "../../shared/pipes/turnicate/truncate.pipe";
import { SearchValidatorDirective } from "../../shared/validators/search-validator.directive";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";
import { MovieItemComponent } from "./movie-item/movie-item.component";
import { MovieSearchComponent } from "./movie-search/movie-search.component";
import { SharedModule } from "../../shared/shared.module";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MoviesRoutingModule } from "./movies-routing-module";

@NgModule({
  declarations: [MovieItemComponent, MovieSearchComponent, MovieDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoviesRoutingModule,

    FormsModule,
    MatMenuItem,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatDividerModule,
    MatExpansionModule,
    MatChipsModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatMenu,
    MatMenuTrigger,

    SearchValidatorDirective,
    TruncateDecimalPipe,
    TruncatePipe,

    SharedModule,
  ],
  exports: [MovieItemComponent, MovieSearchComponent, MovieDetailComponent],
})
export class MoviesModule {}
