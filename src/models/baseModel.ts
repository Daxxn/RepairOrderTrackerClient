export type Credentials = {
  username: string;
  password: string;
}

export interface BaseModel {
  _id: string;
  __v: number;
}

export class BaseModel {
  _id: string = '';
  __v: number = 0;
}