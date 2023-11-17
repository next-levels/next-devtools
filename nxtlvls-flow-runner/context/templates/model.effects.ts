import { Injectable } from '@angular/core';
import { GenericEffects } from '@nxt/generic-store';
import { Agency } from '@vosdellen/data-models';
import { Actions } from '@ngrx/effects';
import { AgenciesService } from '../agencies.service';
import { AgencyStore } from './agencies.store';

@Injectable()
export class ModelEffects extends GenericEffects<Agency> {
  constructor(
    actions$: Actions,
    private agencyService: AgenciesService,
    private agencyStore: AgencyStore
  ) {
    super(actions$, agencyService, agencyStore.baseActions as any);
  }
}
