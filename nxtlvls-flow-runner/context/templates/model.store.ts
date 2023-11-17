import { Agency } from '@vosdellen/data-models';
import {
  BaseStore,
  createGenericActions,
  createGenericReducer,
  GenericData,
} from '@nxt/generic-store';
import { Dictionary } from '@ngrx/entity';
export interface AgenciesState extends GenericData<Agency> {
  entities: Dictionary<Agency>;
}

export class AgencyStore extends BaseStore<Agency, AgenciesState> {
  constructor() {
    super('agencies');

    this.baseReducers = createGenericReducer(
      this.entityName,
      this.baseActions as unknown as ReturnType<typeof createGenericActions>,
      this.adapter
    );
  }

  static getReducers() {
    return new AgencyStore().baseReducers;
  }

  static getActions() {
    return new AgencyStore().baseActions;
  }

  static getSelectors() {
    return new AgencyStore().baseSelectors;
  }
}
