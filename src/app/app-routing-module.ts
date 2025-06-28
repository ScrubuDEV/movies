import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieSearchComponent } from './features/movies/movie-search/movie-search.component';
import { MovieDetailComponent } from './features/movies/movie-detail/movie-detail.component';
import { MovieCollectionComponent } from './features/movie-collection/movie-collection.component';
import { SessionGuard } from './shared/guards/session.guard';
import { CollectionCreateComponent } from './features/movie-collection/collection-create/collection-create.component';
import { CollectionDetailsComponent } from './features/movie-collection/collection-details/collection-details.component';

const routes: Routes = [
  { path: '', component: MovieSearchComponent },
  {
    path: 'collections',
    canActivate: [SessionGuard],
    children: [
      { path: '', component: MovieCollectionComponent },
      { path: 'create', component: CollectionCreateComponent },
      { path: ':id', component: CollectionDetailsComponent },
    ],
  },
  {
    path: 'movie/:id',
    component: MovieDetailComponent,
    outlet: 'popup',
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
