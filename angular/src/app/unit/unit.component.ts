import { Component, OnInit } from '@angular/core';
import { UnitService } from './unit.service'
@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent implements OnInit {

  units: any = []
  constructor(private unitService: UnitService) { }

  ngOnInit() {
    this.unitService.getUnits().subscribe(result => {
      console.log(result)
      this.units = result;
    })
  }

}
