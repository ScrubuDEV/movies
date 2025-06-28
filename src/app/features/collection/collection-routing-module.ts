import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CollectionCreateComponent } from "./movie-collection/collection-create/collection-create.component";
import { CollectionDetailsComponent } from "./movie-collection/collection-details/collection-details.component";
import { MovieCollectionComponent } from "./movie-collection/movie-collection.component";
import { SessionGuard } from "../../shared/guards/session.guard";

const routes: Routes = [
  {
    path: 'collections',
    canActivate: [SessionGuard],
    children: [
      { path: '', component: MovieCollectionComponent },
      { path: 'create', component: CollectionCreateComponent },
      { path: ':id', component: CollectionDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionRoutingModule {}
