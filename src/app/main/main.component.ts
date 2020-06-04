import { Component, OnInit, HostListener } from '@angular/core';

import { LocalStorageService, SessionStorageService  } from 'ngx-webstorage';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  randomNumber: number = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  quantityOfPages: number = this.localStorage.retrieve('quantity_of_pages') || 1;

  @HostListener('window:unload', ['$event'])
    unloadHandler() {
      let quantityOfPagesOpened = this.localStorage.retrieve('quantity_of_pages');
      if (quantityOfPagesOpened > 1) {
        this.localStorage.store('quantity_of_pages', quantityOfPagesOpened - 1);
        this.localStorage.store(`${this.randomNumber}`, this.randomNumber)
      } else {
        this.localStorage.clear('quantity_of_pages');
      }
  }

  constructor(private localStorage: LocalStorageService, private sessionStorage: SessionStorageService) { }

  ngOnInit() {
    this.localStorage.store('request_for_closing', 0);

    this.listenForPagesClosing();
    this.listenForQuantityOfPages();
  }

  listenForPagesClosing() {
    this.localStorage.observe('request_for_closing')
      .subscribe(value => {
        if (value && this.randomNumber % 2 == 0 && value != this.randomNumber) {
      // let quantityOfPagesOpened = this.localStorage.retrieve('quantity_of_pages');
      //   this.localStorage.store('quantity_of_pages', quantityOfPagesOpened - 1);
          window.close()
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

  destroy() {
    let quantityOfPages = this.localStorage.retrieve('quantity_of_pages');
      if (quantityOfPages > 1) {
        this.localStorage.store('quantity_of_pages', quantityOfPages - 1);
      } else {
        this.localStorage.clear('quantity_of_pages');
      }
    window.close();
  }
  addNewPage() {
    this.localStorage.store('quantity_of_pages', this.quantityOfPages + 1);
    // let quantityOfOpenPages = +parseInt(document.cookie.replace(/[^\d]/g, '')) + 1;
    // document.cookie = `quantity_of_pages=${quantityOfOpenPages}`;
  }

  closePages() {
    this.localStorage.store('request_for_closing', this.randomNumber);
  }

}
