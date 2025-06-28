import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CollectionsService } from "../../../../core/services/collections.service";


@Component({
  selector: 'app-collection-create',
  templateUrl: './collection-create.component.html',
  styleUrls: ['./collection-create.component.scss'],
  standalone: false,
})
export class CollectionCreateComponent {
  collectionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private collectionService: CollectionsService,
    private router: Router,
  ) {
    this.collectionForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]],
      description: ['', [Validators.maxLength(300)]], 
    });
  }

  onSubmit(): void {
    if (this.collectionForm.valid) {
      const { title, description } = this.collectionForm.value;
      this.collectionService.createCollection(title, description).subscribe(() => {
        this.router.navigate(['/collections']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/collections']);
  }
}
