import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDatepickerModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DialogAddUserComponent {
  private readonly firestore = inject(Firestore);
  user = new User();

  constructor(
    private readonly dialogRef: MatDialogRef<DialogAddUserComponent>
  ) { }

  cancel() {
    this.dialogRef.close();
  }

  async saveUser() {
    if (!this.user.birthDate) {
      return;
    }
    const userData = this.user.toFirestore();
    const docRef = await addDoc(collection(this.firestore, 'users'), userData);
    console.log('Adding user finished, id:', docRef.id);
    this.dialogRef.close();
  }
}
