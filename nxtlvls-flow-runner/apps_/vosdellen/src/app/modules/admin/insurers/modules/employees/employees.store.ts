import { InsurerEmployee } from '@vosdellen/data-models';
import {
  BaseStore,
  createGenericActions,
  createGenericReducer,
  GenericData,
} from '@nxt/generic-store';
import { Dictionary } from '@ngrx/entity';
export interface EmployeesState extends GenericData<InsurerEmployee> {
  entities: Dictionary<InsurerEmployee>;
}

export class EmployeeStore extends BaseStore<InsurerEmployee, EmployeesState> {
  constructor() {
    super('employees');

    this.baseReducers = createGenericReducer(
      this.entityName,
      this.baseActions as unknown as ReturnType<typeof createGenericActions>,
      this.adapter
    );
  }

  static getReducers() {
    return new EmployeeStore().baseReducers;
  }

  static getActions() {
    return new EmployeeStore().baseActions;
  }

  static getSelectors() {
    return new EmployeeStore().baseSelectors;
  }
}