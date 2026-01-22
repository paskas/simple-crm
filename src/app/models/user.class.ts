export interface FirestoreUser {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  zipCode: number | null;
  birthday: string | null;
}

export class User {
  firstName = '';
  lastName = '';
  email = '';
  street = '';
  city = '';
  birthDate: Date | null = null;
  zipCode: number | null = null;

  static fromFirestore(data: FirestoreUser): User {
    const user = new User();
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    user.street = data.street;
    user.city = data.city;
    user.zipCode = data.zipCode;
    if (data.birthday) {
      const [day, month, year] = data.birthday.split('.').map(Number);
      user.birthDate = new Date(year, month - 1, day);
    }
    return user;
  }

  toFirestore() {
    const date = this.birthDate;
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      street: this.street,
      city: this.city,
      zipCode: this.zipCode,
      birthday: date
        ? `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
        : null,
    };
  }
}
