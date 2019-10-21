import { Component, OnInit, TemplateRef } from '@angular/core';
import { UnitService } from './unit.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {
  modalRef: BsModalRef;
  unitTypes$: any = this.unitService.unitTypes$
  unitTypeToAdd: { name: String, type: Number };

  newUnitName: String = null;
  newUnitMultiplier: Number = null;

  constructor(private unitService: UnitService, private modalService: BsModalService) { }

  ngOnInit() {
    this.unitService.getUnitTypes();
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
      this.unitService.getUnitTypes();
      this.modalRef.hide();
      this.newUnitName = null;
      this.newUnitMultiplier = null;
    })
  }


  deleteUnit(unit) {
    this.unitService.deleteUnit(unit.id);
  }
}

