import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgenciesState, AgencyStore } from './agencies.store';
import { Agency } from '@vosdellen/data-models';
import { BaseFacade } from '@nxt/generic-store';

@Injectable({
  providedIn: 'root',
})
export class ModelFacade extends BaseFacade<Agency, AgenciesState> {
  constructor(public override store: Store<AgenciesState>) {
    super(store, AgencyStore.getActions(), AgencyStore.getSelectors());
  }
}
