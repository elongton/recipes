import { Component, OnInit, TemplateRef } from '@angular/core';
import { IngredientService } from './ingredient.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {
  modalRef: BsModalRef;
  ingredients$ = this.ingredientService.ingredients$;
  constructor(private ingredientService: IngredientService, private modalService: BsModalService) { }

  ngOnInit() {
    this.ingredientService.getIngredients();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
