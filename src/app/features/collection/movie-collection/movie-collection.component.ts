import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { STORAGE_KEY } from '../../../config/movies.constants';
import { LocalCollection } from '../../../core/models/collection.model';
import { CollectionsService } from '../../../core/services/collections.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-movie-collection',
  templateUrl: './movie-collection.component.html',
  styleUrls: ['./movie-collection.component.scss'],
  standalone: false,
})
export class MovieCollectionComponent implements OnInit {
  collections: LocalCollection[] = [];
  isLoading = false;

  constructor(
    public router: Router,
    private collectionService: CollectionsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadCollections();
  }

  loadCollections() {
    this.isLoading = true;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      this.collections = JSON.parse(stored);
      this.isLoading = false;
      this.cdr.markForCheck();
    } else {
      this.collectionService.getCollections().subscribe({
        next: (collections) => {
          this.collections = collections;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
          this.isLoading = false;
          this.cdr.markForCheck();
        },
        error: () => {
          this.isLoading = false;
          this.cdr.markForCheck();
        },
      });
    }
  }

  removeCollection(collectionId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Collection',
        message: 'Are you sure you want to delete this collection?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const updatedCollections = this.collections.filter((c) => c.id !== collectionId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCollections));
        this.collections = [...updatedCollections];
        this.snackBar.open('Collection deleted', 'Close', { duration: 3000 });
        this.cdr.markForCheck();
      }
    });
  }

  viewCollection(collection: LocalCollection): void {
    this.collectionService.setCurrentCollection(collection);
    this.router.navigate(['/collections', collection.id]);
  }

  navigate(): void {
    this.router.navigate(['/collections/create']);
  }
}
