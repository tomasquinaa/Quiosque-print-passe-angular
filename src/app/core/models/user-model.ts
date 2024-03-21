export interface User {
  currency?: string;
  doc_number?: string;
  email?: string;
  hire_date?: string;
  id?: number;
  name?: string;
  occupation?: string;
  phone?: string;
  photo?: string;
  shortname?: string;
}

export interface UserToken {
  access_token?: string;
  expires_in?: string;
  token_type?: string;
  user: User;
}
