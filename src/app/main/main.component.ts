import { Component, OnInit, HostListener } from '@angular/core';

import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  randomNumber: number = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  quantityOfPages: number = this.localStorage.retrieve('quantity_of_pages') || 1;

  @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler() {
      let quantityOfPages = this.localStorage.retrieve('quantity_of_pages');
      this.localStorage.store('quantity_of_pages', quantityOfPages - 1);
  }

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.localStorage.store('close_pages', false);

    this.listenForPagesClosing();
    this.listenForQuantityOfPages();
  }

  listenForPagesClosing() {
    this.localStorage.observe('close_pages')
      .subscribe(value => {
        let activePage = this.localStorage.retrieve('active_page');
          if (value && this.randomNumber % 2 == 0 && activePage != this.randomNumber) {
            this.localStorage.clear('active_page');
            this.destroyPage();
          }
      })
  }

  listenForQuantityOfPages() {
    this.localStorage.observe('quantity_of_pages')
      .subscribe(value => {
        if (value) {
          this.quantityOfPages = value;
        }
      })
  }

  destroyPage() {
    let quantityOfPages = this.localStorage.retrieve('quantity_of_pages');
    this.localStorage.store('quantity_of_pages', quantityOfPages - 1);
    window.close();
  }

  addNewPage() {
    this.localStorage.store('quantity_of_pages', this.quantityOfPages + 1);
  }

  closePages() {
    this.localStorage.store('active_page', this.randomNumber);
    this.localStorage.store('close_pages', true);
  }

}
