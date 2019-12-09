import { Component, OnInit, TemplateRef } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { RefDataService } from 'src/app/core/services/ref-data.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { Tag } from 'src/app/core/models/tag.model';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer'

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  tagCategories: any
  newTag: string = '';
  newTagType: string = '';
  modalRef: BsModalRef;
  tags: Tag[];


  constructor(
    private appService: AppService,
    private modalService: BsModalService,
    private ref: RefDataService,
    private http: HttpClient,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.appService.getTags();
    this.ref.lookup$.pipe(
      switchMap(() => {
        this.tagCategories = [];
        return this.store.select('tags')
      })).subscribe(tags => {
        this.tags = tags.tags
      })


    // subscribe(() => {
    //   this.tagCategories = this.ref.get('tag_category');
    // })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  createTag() {
    let tag = {
      name: this.newTag,
      tag_type: this.newTagType,
    }
    this.http.post(`/api/tags/`, tag).subscribe(result => {
      let currentTags = this.appService.tags$.getValue()
      currentTags.push(result);
      this.appService.tags$.next(currentTags)
      this.modalRef.hide();
    })
  }

  deleteTag(id) {
    this.http.delete(`/api/tags/${id}`).subscribe(result => {
      this.appService.tags$.next(
        this.appService.tags$.getValue().filter(ing => ing.id !== id)
      );
    })
  }

}
