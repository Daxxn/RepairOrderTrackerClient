import { BaseModel, BaseObjects as BaseObject } from './baseModel';
import JobModel, { JobObjects } from './jobModel';
import PayPeriodModel, { PayPeriodObjects } from './payPeriodModel';
import RepairOrderModel, { RepairOrderObjects } from './repairOrderModel';
import TechModel, { TechObjects } from './techModel';
import UrlHelper from '../utils/urlHelper';
import { BasicResponse } from '../utils/responseTypes';
import { createNewModel } from '../utils/fetchMethods';
// import Messenger from '../utils/ErrorMessenger';

// const messages = Messenger.get();

export type UserCallback = (updatedUser: UserModel | null) => void;
export type ModelCallback = (updatedModel: BaseModel) => void;
export type ObjectCallback = (updatedObjects: BaseObject) => void;

type UserObservers = {
  userListeners: {
    [id: string]: UserCallback;
  };
  modelListeners: ModelObserver;
  objectListeners: ObjectObserver;
};

type ModelObserver = {
  [key in ModelType]: {
    [id: string]: ModelCallback;
  };
};

type ObjectObserver = {
  [key in ModelType]: {
    [id: string]: ObjectCallback;
  };
};

export type ModelType = 'PayPeriods' | 'RepairOrders' | 'Jobs' | 'Techs';
export type BaseType = PayPeriodModel | RepairOrderModel | JobModel | TechModel;

export type ModelObjects =
  | PayPeriodObjects
  | RepairOrderObjects
  | JobObjects
  | TechObjects;

export type UserData = {
  PayPeriods: PayPeriodObjects;
  RepairOrders: RepairOrderObjects;
  Techs: TechObjects;
  Jobs: JobObjects;
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
  // #region Props
  _id = '';
  __v = 0;
  private static userObservers: UserObservers = {
    userListeners: {},
    modelListeners: {
      PayPeriods: {},
      RepairOrders: {},
      Jobs: {},
      Techs: {},
    },
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

  private static readonly defaultId = 'default';
  // #endregion

  // #region Methods

  // #region Private Methods
  private static initObservers() {
    this.userObservers = {
      userListeners: {},
      modelListeners: {
        PayPeriods: {},
        RepairOrders: {},
        Jobs: {},
        Techs: {},
      },
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
    console.log('setUser() Should not be called right now.');
    this.user = user;

    // Send POST request to API

    this.updateUserObservers(user);
  }

  static setUserData(data: UserData): void {
    this.modelData.PayPeriods = data.PayPeriods;
    this.modelData.RepairOrders = data.RepairOrders;
    this.modelData.Jobs = data.Jobs;
    this.modelData.Techs = data.Techs;

    this.updateUserObservers(this.user);
  }

  static initializeUser(user: UserModel, data: UserData): void {
    this.user = user;
    this.modelData.PayPeriods = data.PayPeriods;
    this.modelData.RepairOrders = data.RepairOrders;
    this.modelData.Jobs = data.Jobs;
    this.modelData.Techs = data.Techs;

    this.updateUserObservers(this.user);
  }

  static getObjects(type: ModelType): ModelObjects {
    console.log('getObjects', this.modelData[type]);
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
    console.log(`type: ${type} , ID: ${id}`);
    console.log(this.modelData);
    if (this.modelData[type][id]) {
      return this.modelData[type][id];
    }
    return null;
  }

  // #region New Model Gen 1
  // static newModel(type: ModelType, parentId?: string): void {
  //   if (this.user && this.modelData[type]) {
  //     if (this.modelData[type][this.defaultId]) {
  //       console.log('exit for some reason??');
  //       return;
  //     }
  //     let newModel;
  //     switch (type) {
  //       case 'PayPeriods':
  //         newModel = new PayPeriodModel();
  //         this.user.payPeriods.push(this.defaultId);
  //         break;
  //       case 'RepairOrders':
  //         newModel = new RepairOrderModel();
  //         break;
  //       case 'Jobs':
  //         newModel = new JobModel();
  //         break;
  //       case 'Techs':
  //         newModel = new TechModel();
  //         break;
  //       default:
  //         throw new Error('Unknown Type');
  //     }
  //     newModel._id = this.defaultId;
  //     newModel.userId = this.user ? this.user?._id : '';

  //     console.log('added: ', newModel);
  //     // console.log('Mock: send POST request to server.');
  //     createNewModel(type)
  //       .then(savedUser => {
  //         delete this.modelData[type][this.defaultId];
  //         // switch (type) {
  //         //   case 'PayPeriods':
  //         //     this.modelData[type][savedModel._id] = savedModel as PayPeriodModel;
  //         //     break;
  //         //   case 'RepairOrders':
  //         //     this.modelData[type][savedModel._id] = savedModel as RepairOrderModel;
  //         //     break;
  //         //     case 'Jobs':
  //         //       this.modelData[type][savedModel._id] = savedModel as JobModel;
  //         //       break;
  //         //       case 'Techs':
  //         //         this.modelData[type][savedModel._id] = savedModel as TechModel;
  //         //         break;
  //         //   default:
  //         //     break;
  //         // }
  //         console.log('User:', savedUser);
  //         this.updateUserObservers(savedUser);
  //       })
  //       .catch(err => console.log(err));
  //   }
  // }
  // #endregion

  // #region New Model Gen 2
  // static async newModel(type: ModelType, parentId?: string): Promise<void> {
  //   try {
  //     this.user = await createNewModel(type, parentId);
  //     this.updateUserObservers(this.user);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // #endregion

  // #region New Model Gen 3
  static async newModel(
    type: ModelType,
    parentType?: ModelType,
    parentId?: string
  ): Promise<void> {
    if (this.user) {
      try {
        const { parent, model } = await createNewModel(type, parentId ?? this.user._id);
        if (parentType && type !== 'PayPeriods') {
          this.modelData[parentType][parent._id] = parent as BaseType;
          this.modelData[type][model._id] = model;
          this.updateModelObservers(parentType, parent);
        } else {
          this.user = parent as UserModel;
          this.modelData[type][model._id] = model;
          this.updateUserObservers(this.user);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  // #endregion

  static removeModel(type: ModelType, id: string): void {
    if (this.user && this.modelData[type]) {
      if (this.modelData[type][id]) {
        delete this.modelData[type][id];
      }
      if (type === 'PayPeriods') {
        this.user.payPeriods = this.user.payPeriods.filter(pp => pp !== id);
      }

      // Send request to server...

      this.updateUserObservers(this.user);
    }
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
    }
  }

  static appendModelObserver(id: string, type: ModelType, callback: ModelCallback): void {
    if (this.userObservers) {
      if (this.userObservers.modelListeners[type]) {
        if (!this.userObservers.modelListeners[type][id]) {
          this.userObservers.modelListeners[type][id] = callback;
        }
      }
    }
  }

  static appendObjectObserver(
    id: string,
    type: ModelType,
    callback: ObjectCallback
  ): void {
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
      if (this.userObservers.modelListeners[type]) {
        if (this.userObservers.modelListeners[type][id]) {
          delete this.userObservers.modelListeners[type][id];
        }
      }
    }
  }

  static removeObjectObservers(id: string, type: ModelType): void {
    if (this.userObservers) {
      if (this.userObservers.objectListeners[type]) {
        if (this.userObservers.objectListeners[type][id]) {
          delete this.userObservers.objectListeners[type][id];
        }
      }
    }
  }

  private static updateUserObservers(updatedUser?: UserModel | null): void {
    if (updatedUser) {
      Object.values(this.userObservers.userListeners).forEach(o => o(updatedUser));
    } else {
      Object.values(this.userObservers.userListeners).forEach(o => o(this.user));
    }
  }

  private static updateModelObservers(type: ModelType, updatedModel: BaseModel): void {
    Object.values(this.userObservers.modelListeners[type]).forEach(obs =>
      obs(updatedModel)
    );
  }

  private static updateObjectObservers(
    type: ModelType,
    updatedObjects: BaseObject
  ): void {
    Object.values(this.userObservers.objectListeners[type]).forEach(obs =>
      obs(updatedObjects)
    );
  }
  // #endregion
  // #endregion
}

export default UserModel;
