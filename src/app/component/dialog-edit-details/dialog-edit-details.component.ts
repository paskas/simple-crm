import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User, FirestoreUser } from '../../models/user.class';
import { Firestore, doc, updateDoc, docData } from '@angular/fire/firestore';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dialog-edit-details',
  imports: [MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDatepickerModule,
    MatIconModule,
    FormsModule,
    MatProgressBarModule,],
  templateUrl: './dialog-edit-details.component.html',
  styleUrl: './dialog-edit-details.component.scss',
})
export class DialogEditDetailsComponent {
  private readonly firestore = inject(Firestore);
  private readonly dialogRef = inject(MatDialogRef<DialogEditDetailsComponent>);
  private readonly data = inject<{ userId: string }>(MAT_DIALOG_DATA);

  user = new User();
  loading = false;

  constructor() {
    this.loadUser();
  }

  cancel() {
    this.dialogRef.close();
  }

  async loadUser() {
    const userDocRef = doc(this.firestore, 'users', this.data.userId);
    const firestoreUser = await firstValueFrom(docData(userDocRef)) as FirestoreUser;
    this.user = User.fromFirestore(firestoreUser);
  }

  async saveUser() {
    if (!this.user.birthDate) {
      return;
    }
    this.loading = true;
    try {
      const userData = this.user.toFirestore();
      const userDocRef = doc(this.firestore, 'users', this.data.userId);
      await updateDoc(userDocRef, userData);
      this.dialogRef.close(true);
    } catch (error) {
      console.error('Saving user failed', error);
    } finally {
      this.loading = false;
    }
  }
}
