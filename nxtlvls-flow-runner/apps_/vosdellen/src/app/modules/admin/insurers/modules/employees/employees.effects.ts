import { Injectable } from '@angular/core';
import { GenericEffects } from '@nxt/generic-store';
import { InsurerEmployee } from '@vosdellen/data-models';
import { Actions } from '@ngrx/effects';
import { EmployeesService } from '../employees.service';
import { EmployeesStore } from './employees.store';

@Injectable()
export class EmployeesEffects extends GenericEffects<InsurerEmployee> {
  constructor(
    actions$: Actions,
    private employeesService: EmployeesService,
    private employeesStore: EmployeesStore
  ) {
    super(actions$, employeesService, employeesStore.baseActions as any);
  }
}