import { Component, OnInit, TemplateRef } from '@angular/core';
import { UnitService } from './unit.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import * as UnitActions from '../../admin/unit/store/unit.actions';
@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
  modalRef: BsModalRef;
  unitTypes: any = []

  //add unit
  unitTypeToAdd: { name: string, type: number };
  newUnitName: string = null;
  newUnitMultiplier: number = null;

  //add unit type
  newUnitType: string = null;
  newBaseUnit: string = null;

  constructor(
    private unitService: UnitService,
    private modalService: BsModalService,
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit() {
    this.store.select('units').subscribe(units => { this.createUnitTypeArray(units); })
  }

  createUnitTypeArray(units) {
    let unitArray = [];
    this.unitTypes = [];
    units.types.forEach(type => {
      unitArray = units.units.filter(unit => { return unit.unit_type === type.id })
      this.unitTypes.push({ name: type.name, units: unitArray });
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createUnit() {
    let newUnit = {
      name: this.newUnitName,
      unit_type: this.unitTypeToAdd.type,
      base_unit: false,
      multiplier: this.newUnitMultiplier,
    }
    this.unitService.createUnit(newUnit).subscribe(result => {
      this.clearAndHideForms();
    })
  }

  createUnitType() {
    let newUnitType = {
      name: this.newUnitType,
      base_unit: this.newBaseUnit,
    }


    this.store.dispatch(new UnitActions.BeginCreateUnitType(newUnitType))
    this.clearAndHideForms();
  }

  clearAndHideForms() {
    this.modalRef.hide();
    this.newUnitType = null;
    this.newBaseUnit = null;
    this.newUnitName = null;
    this.newUnitMultiplier = null;
  }

  deleteUnit(unit) {
    this.unitService.deleteUnit(unit.id);
  }
}

