export class User {
  firstName = '';
  lastName = '';
  street = '';
  city = '';
  birthDate: Date | null = null;
  zipCode: number | null = null;

  toFirestore() {
    const date = this.birthDate;
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      street: this.street,
      city: this.city,
      zipCode: this.zipCode,
      birthday: date ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}` : null,
    };
  }
}

export interface FirestoreUser {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  zipCode: number | null;
  birthday: string | null;
}
