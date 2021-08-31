export type Credentials = {
  username: string;
  password: string;
};

export type BaseObjects = {
  [id: string]: BaseModel;
};

export interface BaseModel {
  _id: string;
  __v: number;
  userId: string;
}

export class BaseModel {
  _id = '';
  __v = 0;
  userId = '';
}
