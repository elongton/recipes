import { Component, OnInit, TemplateRef } from '@angular/core';
import { UnitService } from './unit.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppService } from '../app.service';
@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
  sidenav;
  modalRef: BsModalRef;
  unitTypes: any

  //add unit
  unitTypeToAdd: { name: String, type: Number };
  newUnitName: String = null;
  newUnitMultiplier: Number = null;

  //add unit type
  newUnitType: String = null;
  newBaseUnit: String = null;

  constructor(
    private unitService: UnitService,
    private modalService: BsModalService,
    private appService: AppService,) { }

  ngOnInit() {
    this.unitService.getUnitTypes();
    this.appService.unitTypes$.subscribe(result => {
      this.unitTypes = result;
    })
  }

  openModal(template: TemplateRef<any>) {
    console.log(this.unitTypeToAdd)
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
      this.modalRef.hide();
      this.newUnitName = null;
      this.newUnitMultiplier = null;
    })
  }

  createUnitType() {
    let newUnitType = {
      name: this.newUnitType,
      base_unit: this.newBaseUnit,
    }

    this.unitService.createUnitType(newUnitType).subscribe(result => {
      this.modalRef.hide();
      this.newUnitType = null;
      this.newBaseUnit = null;
    })


  }


  deleteUnit(unit) {
    this.unitService.deleteUnit(unit.id);
  }
}

