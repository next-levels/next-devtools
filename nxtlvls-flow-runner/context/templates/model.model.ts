import {
  FieldType,
  i_FormBuilderOptions,
  i_FormBuilderRelationOptions,
} from '@form-builder/models/settings';
import { File, Insurer } from '@vosdellen/data-models';
import { FormField } from '@form-builder';
import { ListField } from '@form-builder/decorator/ListField';
import { ValidationTypes } from '@form-builder/models/ValidationTypes';
 import { Visibility } from '@form-builder/decorator/Visibility';
import {InsurerStore} from "./+state/insurers.store";

export class InsurerModel implements Insurer {
  className?: string = 'InsurerModel';

  @ListField({ type: FieldType.TEXT })
  @FormField({ type: FieldType.TEXT })
  id?: number;
  created_at: Date;
  files?: File[];

  @Visibility({
    showModal: 'general',
  })
  @ListField({ type: FieldType.TEXT })
  @FormField({ type: FieldType.TEXT })
  insurer_number: string;

  @Visibility({
    showModal: 'Allgemeine Daten',
  })
  @ListField({ type: FieldType.TEXT })
  @FormField({ type: FieldType.TEXT })
  name: string;

  @Visibility({
    showModal: 'Allgemeine Daten',
  })
  @ListField({ type: FieldType.TEXT })
  @FormField({ type: FieldType.TEXT })
  short_name: string;

  @Visibility({
    showModal: 'Allgemeine Daten',
  })
  @ListField({ type: FieldType.TEXT })
  @FormField({ type: FieldType.TEXT })
  city: string;

  @Visibility({
    showModal: 'Stammdaten',
  })
  @ListField({ type: FieldType.TEXT })
  @FormField({ type: FieldType.DROPDOWN })
  country_code: string;

  @Visibility({
    showModal: 'Stammdaten',
  })
  @FormField({ type: FieldType.TEXT })
  po_box: string;

  @Visibility({
    showModal: 'Stammdaten',
  })
  @FormField({ type: FieldType.TEXT })
  @ListField({ type: FieldType.TEXT })
  postal_code: string;

  @Visibility({
    showModal: 'Stammdaten',
  })
  @FormField({ type: FieldType.TEXT })
  @ListField({ type: FieldType.TEXT })
  street: string;

  @Visibility({
    showModal: 'Kommunikation',
  })
  @FormField({ type: FieldType.TEXT, validation: ValidationTypes.PHONE_NUMBER })
  phone_business: string;

  @Visibility({
    showModal: 'Kommunikation',
  })
  @FormField({ type: FieldType.TEXT })
  phone_mobile: string;

  @Visibility({
    showModal: 'Kommunikation',
  })
  @FormField({ type: FieldType.TEXT })
  phone_private: string;

  @Visibility({
    showModal: 'Kommunikation',
  })
  @FormField({ type: FieldType.TEXT, validation: ValidationTypes.EMAIL })
  @ListField({ type: FieldType.TEXT })
  mail: string;

  @Visibility({
    showModal: 'Kommunikation',
  })
  @FormField({ type: FieldType.TEXT })
  homepage: string;

  @Visibility({
    showModal: 'Kommunikation',
  })
  @FormField({ type: FieldType.DATE })
  contract_since: Date;

  @Visibility({
    showModal: 'Vertragsdaten',
  })
  @FormField({ type: FieldType.DROPDOWN })
  @ListField({ type: 'state' })
  status: string;

  @Visibility({
    showModal: 'Vertragsdaten',
  })
  @FormField({ type: FieldType.TEXTAREA })
  notes_to_insurer: string;

  @Visibility({
    showModal: 'Vertragsdaten',
  })
  @FormField({ type: FieldType.TEXTAREA })
  agency_account_nr: number;

  @Visibility({
    showModal: 'Vertragsdaten',
  })
  @FormField({ type: FieldType.TEXTAREA })
  agency_name: string;

  constructor() {
    this.created_at = new Date();
    this.insurer_number = '';
    this.name = '';
    this.short_name = '';
    this.city = '';
    this.country_code = '';
    this.po_box = '';
    this.postal_code = '';
    this.street = '';
    this.phone_business = '';
    this.phone_mobile = '';
    this.phone_private = '';
    this.mail = '';
    this.homepage = '';
    this.contract_since = new Date();
    this.status = '';
    this.notes_to_insurer = '';
    this.agency_account_nr = 0;
    this.agency_name = '';
  }

  static getSelf(): InsurerModel {
    return new InsurerModel();
  }

  relationSettings(): i_FormBuilderRelationOptions {
    return {
      modelName: 'InsurerModel',
      scope: {},
      selector: InsurerStore.getSelectors().getEntities,
      action: InsurerStore.getActions().load(),
      fields: ['insurer_number', 'name', 'id'],
    };
  }

  dropdowns(field: string): i_FormBuilderOptions[] {
    switch (field) {
      case 'country_code':
        return [
          { value: 'de', label: 'DE' },
          { value: 'en', label: 'EN' },
          { value: 'es', label: 'ES' },
          { value: 'fr', label: 'FR' },
        ];
      case 'status':
        return [
          { value: 'Antrag', label: 'Antrag' },
          { value: 'lebend', label: 'lebend' },
          { value: 'storniert', label: 'storniert' },
        ];
      default:
        return [];
    }
  }
}
