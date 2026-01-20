import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FirestoreUser } from '../../models/user.class';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';


@Component({
  selector: 'app-user',
  imports: [MatButtonModule, MatIconModule, MatDialogModule, MatTableModule, AsyncPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})

export class UserComponent {
  private firestore = inject(Firestore);
  private dialog = inject(MatDialog);

  private userProfileCollection = collection(this.firestore, 'users');
  users$ = collectionData(this.userProfileCollection) as Observable<FirestoreUser[]>;

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'street',
    'city',
    'zipCode',
    'birthday',
  ];

  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }
}