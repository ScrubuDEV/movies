import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../../core/models/movie.model';
import { LocalCollection } from '../../../core/models/collection.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  standalone: false,
  styleUrls: ['./movie-item.component.scss'],
})
export class MovieItemComponent {
  @Input() movie!: Movie;
  @Input() collections: LocalCollection[] = [];

  @Output() clicked = new EventEmitter<void>();
  @Output() addedToCollection = new EventEmitter<string>();

  imageLoaded = false;

  constructor() {}

  addToCollection(collectionId: string) {
    this.addedToCollection.emit(collectionId);
  }

  onImageLoad(): void {
    this.imageLoaded = true;
  }

  filteredCollections(): LocalCollection[] {
    return this.collections.filter((collection) => !collection.movie_ids.includes(this.movie.id));
  }
}
