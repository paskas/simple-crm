import { Component, inject } from '@angular/core';
import { Firestore, doc, updateDoc, docData } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FirestoreUser, User } from '../../models/user.class';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dialog-edit-user',
  imports: [MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDatepickerModule,
    MatIconModule,
    FormsModule,
    MatProgressBarModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {
  private readonly firestore = inject(Firestore);
  private readonly dialogRef = inject(MatDialogRef<DialogEditUserComponent>);
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
