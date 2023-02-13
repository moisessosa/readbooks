export interface Book {
  title: string;
  gener1: string;
  gener2?: string;
  descrip: string;
  date_public?: Date;
  date_end?: Date;
  reading_num?: BigInteger;
  id_user: number;
}
export class Book2 {
  title!: string;
  gener1!: string;
  gener2?: string;
  descrip!: string;
  date_public?: Date;
  date_end?: Date;
  reading_num?: BigInteger;
  id_user!: number;
  constructor(title: string, gener1: string, descrip: string, id_user: number) {
    this.title = title;
    this.gener1 = gener1;
    this.descrip = descrip;
    this.id_user = id_user;
  }
}
