import { BaseModel } from './baseModel';
import { JobObjects } from './jobModel';
import { PayPeriodObjects } from './payPeriodModel';
import { RepairOrderObjects } from './repairOrderModel';
import { TechObjects } from './techModel';

export type UserCallback = (updatedUser: UserModel | null) => void;

type UserObserver = {
  [id: string]: UserCallback;
};

export type ModelType = 'PayPeriods' | 'RepairOrders' | 'Jobs' | 'Techs';

export type ModelObjects =
  | PayPeriodObjects
  | RepairOrderObjects
  | JobObjects
  | TechObjects;

export type UserData = {
  user: UserModel;
  payPeriods: PayPeriodObjects;
  repairOrders: RepairOrderObjects;
  techs: TechObjects;
  jobs: JobObjects;
};

export default interface UserModel extends BaseModel {
  userName: string;
  firstName: string;
  lastName: string;
  dateCreated: Date;
  auth0Id: string;
  isAdmin: boolean;
  payPeriods: string[];
}

export default class UserModel extends BaseModel {
  //#region Props
  private static observers: UserObserver = {};
  private static user: UserModel | null = null;
  private static payPeriods: PayPeriodObjects;
  private static repairOrders: RepairOrderObjects;
  private static jobs: JobObjects;
  private static techs: TechObjects;
  //#endregion

  //#region Methods
  static getUser(): UserModel | null {
    return this.user;
  }

  static setUser(user: UserModel | null) {
    this.user = user;

    // Send POST request to API

    this.update(user);
  }

  static getObjects(type: ModelType): ModelObjects  {
    switch (type) {
      case 'PayPeriods':
        return this.payPeriods;
      case 'RepairOrders':
        return this.repairOrders;
      case 'Techs':
        return this.techs;
      case 'Jobs':
        return this.jobs;
    }
  }

  static setObjects(type: ModelType, data: ModelObjects) {
    switch (type) {
      case 'PayPeriods':
        this.payPeriods = data as PayPeriodObjects;
        break;
      case 'RepairOrders':
        this.repairOrders = data as RepairOrderObjects;
        break;
      case 'Techs':
        this.techs = data as TechObjects;
        break;
      case 'Jobs':
        this.jobs = data as JobObjects;
        break;
    }
  }

  //#region Observer Pattern Methods
  static append(id: string, callback: UserCallback) {
    if (this.observers) {
      if (!this.observers[id]) {
        this.observers[id] = callback;
      }
    }
  }

  static remove(id: string) {
    if (this.observers) {
      if (!this.observers[id]) {
        delete this.observers[id];
      }
    }
  }

  static update(updatedUser: UserModel | null) {
    Object.values(this.observers).forEach(o => o(updatedUser));
  }
  //#endregion
  //#endregion
}