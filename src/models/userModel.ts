import { BaseModel } from './baseModel';
import JobModel, { JobObjects } from './jobModel';
import PayPeriodModel, { PayPeriodObjects } from './payPeriodModel';
import RepairOrderModel, { RepairOrderObjects } from './repairOrderModel';
import TechModel, { TechObjects } from './techModel';
import UrlHelper from '../utils/urlHelper';
import { BasicResponse } from '../utils/responseTypes';

export type UserCallback = (updatedUser: UserModel | null) => void;
export type ModelCallback = (updatedModel: BaseModel) => void;
// export type ObjectCallback = (updatedObjects: BaseObjects) => void;

type UserObservers = {
  userListeners: {
    [id: string]: UserCallback;
  };
  objectListeners: ModelObserver;
};

type ModelObserver = {
  [key in ModelType]: {
    [id: string]: ModelCallback;
  };
};

// type UserModelObservers = {
//   payPeriodObservers: ModelObserver<PayPeriodModel>;
//   repairOrderObservers: ModelObserver<RepairOrderModel>;
//   jobObservers: ModelObserver<JobModel>;
//   techObservers: ModelObserver<TechModel>;
// };

// type UserModelObservers = {
//   [key in ModelType]: ModelObserver;
// };

export type ModelType = 'PayPeriods' | 'RepairOrders' | 'Jobs' | 'Techs';
export type BaseType = PayPeriodModel | RepairOrderModel | JobModel | TechModel;

export type ModelObjects =
  | PayPeriodObjects
  | RepairOrderObjects
  | JobObjects
  | TechObjects;

export type UserData = {
  payPeriods: PayPeriodObjects;
  repairOrders: RepairOrderObjects;
  techs: TechObjects;
  jobs: JobObjects;
};

export type ModelData = {
  [key in ModelType]: ModelObjects;
};

interface UserModel extends BaseModel {
  authId: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  dateCreated: Date;
  isAuthenticated: boolean;
  isAdmin: boolean;
  payPeriods: string[];
}

class UserModel {
  _id = '';
  __v = 0;
  // #region Props
  private static userObservers: UserObservers = {
    userListeners: {},
    objectListeners: {
      PayPeriods: {},
      RepairOrders: {},
      Jobs: {},
      Techs: {},
    },
  };
  private static user: UserModel | null = null;
  private static modelData: ModelData = {
    PayPeriods: {},
    RepairOrders: {},
    Jobs: {},
    Techs: {},
  };
  // #endregion

  // #region Methods

  // #region Private Methods
  private static initObservers() {
    this.userObservers = {
      userListeners: {},
      objectListeners: {
        PayPeriods: {},
        RepairOrders: {},
        Jobs: {},
        Techs: {},
      },
    };
  }
  // #endregion

  static getUser(): UserModel | null {
    return this.user;
  }

  static setUser(user: UserModel | null): void {
    this.user = user;

    // Send POST request to API

    this.updateUserObservers(user);
  }

  static setUserData(data: UserData): void {
    this.modelData.PayPeriods = data.payPeriods;
    this.modelData.RepairOrders = data.repairOrders;
    this.modelData.Jobs = data.jobs;
    this.modelData.Techs = data.techs;

    this.updateUserObservers(this.user);
  }

  static getObjects(type: ModelType): ModelObjects {
    return this.modelData[type];
  }

  static setObjects(type: ModelType, data: ModelObjects): void {
    if (this.modelData) {
      this.modelData[type] = data;
    }
  }

  static setModel(type: ModelType, data: BaseType): void {
    if (this.modelData) {
      this.modelData[type][data._id] = data;
    }

    this.updateModelObservers(type, data);
  }

  static getModel(type: ModelType, id: string): BaseModel | null {
    if (this.modelData[type][id]) {
      return this.modelData[type][id];
    }
    return null;
  }

  private static async saveUser() {
    if (this.user) {
      try {
        const fetchInit = UrlHelper.buildUserUrl('root', 'PATCH');
        const response = await fetch(fetchInit.url, fetchInit.requestInit);
        const data = (await response.json()) as BasicResponse;
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
  }

  // #region Observer Pattern Methods
  static appendUserObserver(id: string, callback: UserCallback): void {
    if (this.userObservers) {
      if (!this.userObservers.userListeners[id]) {
        this.userObservers.userListeners[id] = callback;
      }
    } else {
      this.initObservers();
    }
  }

  static appendModelObserver(id: string, type: ModelType, callback: ModelCallback): void {
    if (this.userObservers) {
      if (this.userObservers.objectListeners[type]) {
        if (!this.userObservers.objectListeners[type][id]) {
          this.userObservers.objectListeners[type][id] = callback;
        }
      }
    }
  }

  static removeUserObserver(id: string): void {
    if (this.userObservers) {
      if (this.userObservers.userListeners[id]) {
        delete this.userObservers.userListeners[id];
      }
    }
  }

  static removeModelObservers(id: string, type: ModelType): void {
    if (this.userObservers) {
      if (this.userObservers.objectListeners[type]) {
        if (this.userObservers.objectListeners[type][id]) {
          delete this.userObservers.objectListeners[type][id];
        }
      }
    }
  }

  private static updateUserObservers(updatedUser: UserModel | null): void {
    Object.values(this.userObservers.userListeners).forEach(o => o(updatedUser));
  }

  private static updateModelObservers(type: ModelType, updatedModel: BaseModel): void {
    Object.values(this.userObservers.objectListeners[type]).forEach(obs =>
      obs(updatedModel)
    );
  }
  // #endregion
  // #endregion
}

export default UserModel;
