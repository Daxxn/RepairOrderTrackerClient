import { BaseType, ModelType } from '../models/userModel';
import { updateModel } from './fetchMethods';

export type UpdateCallback = (updatedmodel: BaseType) => void;
type Schedule = {
  [modelId: string]: {
    type: ModelType;
    model: BaseType;
    callBack: UpdateCallback;
  };
};

class ApiHandler {
  private static timerId: NodeJS.Timeout | null;
  private static schedule: Schedule = {};

  static scheduleUpdate = (
    type: ModelType,
    model: BaseType,
    callback: UpdateCallback
  ): void => {
    if (ApiHandler.timerId) {
      clearInterval(ApiHandler.timerId);
    }
    if (ApiHandler.schedule) {
      ApiHandler.schedule[model._id] = {
        type,
        model,
        callBack: callback,
      };
      ApiHandler.timerId = setTimeout(
        ApiHandler.sendUpdate,
        1000 * 2,
        ApiHandler.schedule[model._id]
      );
    }
  };

  private static sendUpdate = (): void => {
    Object.values(ApiHandler.schedule).forEach(sch => {
      console.log('sending Update:', sch);
      updateModel(sch.type, sch.model)
        .then(data => sch.callBack(data))
        .catch(err => console.log(err));
      sch.callBack(sch.model);
      ApiHandler.timerId = null;
    });
  };
}

export default ApiHandler;
