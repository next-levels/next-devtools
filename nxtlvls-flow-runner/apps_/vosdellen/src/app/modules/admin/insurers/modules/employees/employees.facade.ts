import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { InsurersState, InsurerStore } from './insurers.store';
import { Insurer, InsurerEmployee } from '@vosdellen/data-models';
import { BaseFacade } from '@nxt/generic-store';

@Injectable({
  providedIn: 'root',
})
export class EmployeesFacade extends BaseFacade<InsurerEmployee, InsurersState> {
  constructor(public override store: Store<InsurersState>) {
    super(store, InsurerStore.getActions(), InsurerStore.getSelectors());
  }
}