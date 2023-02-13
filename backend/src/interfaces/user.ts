export interface User {
  dni: string;
  name1: string;
  name2?: string;
  last_name1: string;
  last_name2?: string;
  nick_name: string;
  email: string;
  date_birth: string;
  address?: string;
  country?: string;
  password: string;
}
export interface JwtUser {
  nombre: string;
  casa: string;
  iat: number;
  exp: number;
}
export interface JwtVerication {
  id?: string;
}
/*export class libro {
  let title string,
   gener1,gener2,descrip,
    date_public,
    date_end,
    reading_num,id_user
}*/
