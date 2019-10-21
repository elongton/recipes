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
  unitTypes: any = []
  unitTypeToAdd: { name: string, type: number };

  constructor(private unitService: UnitService, private modalService: BsModalService) { }

  ngOnInit() {
    this.unitService.getUnitTypes().subscribe(result => {
      console.log(result)
      this.unitTypes = result;
    })
  }


  openModal(template: TemplateRef<any>) {
    console.log(this.unitTypeToAdd)
    this.modalRef = this.modalService.show(template);
  }

}
