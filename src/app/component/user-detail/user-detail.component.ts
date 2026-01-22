import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { FirestoreUser } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditDetailsComponent } from '../dialog-edit-details/dialog-edit-details.component';

@Component({
  selector: 'app-user-detail',
  imports: [AsyncPipe, MatCardModule, MatIconModule, MatButtonModule, MatMenuModule, MatDialogModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  user$: Observable<FirestoreUser> = this.route.paramMap.pipe(
    switchMap((params) => {
      let userId = params.get('id')!;
      let userDocRef = doc(this.firestore, `users/${userId}`);
      return docData(userDocRef) as Observable<FirestoreUser>;
    })
  );

  editUserMenu() {
    let userId = this.route.snapshot.paramMap.get('id')!;
    this.dialog.open(DialogEditDetailsComponent, {
      data: { userId },
    });
  }

  editDetailMenu() {
    let userId = this.route.snapshot.paramMap.get('id')!;
    this.dialog.open(DialogEditDetailsComponent, {
      data: { userId },
    });
  }
}
