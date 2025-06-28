import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SessionGuard } from './shared/guards/session.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/movies/movies.module').then((m) => m.MoviesModule),
  },
  {
    path: 'collections',
    canActivate: [SessionGuard],
    loadChildren: () =>
      import('./features/collection/collection.module').then((m) => m.CollectionsModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
