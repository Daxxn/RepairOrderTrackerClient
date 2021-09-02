import { BaseType, ModelType } from '../models/userModel';

export type HandleSelectItem = (itemId: string) => void;

export type HandleNewModel = (
  type: ModelType,
  parentType?: ModelType,
  parentId?: string
) => void;

/**
 * Callback to add a complete model
 */
export type HandleAddNewModel = (
  type: ModelType,
  parentId: string,
  newModel: BaseType
) => void;

export type HandleConfirm = (modelIds: string[]) => void;

export type HandleEditComplete = () => void;

export type HandleEditChange = (prop: string, value: string | number) => void;

export type HandleDateEditComplete = () => void;

export type HandleDateEditChange = (prop: string, value: Date) => void;
