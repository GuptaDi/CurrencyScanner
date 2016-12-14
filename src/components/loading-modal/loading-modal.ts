import { Component } from '@angular/core';

/*
  Generated class for the LoadingModal component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'loading-modal',
  templateUrl: 'loading-modal.html'
})
export class LoadingModalComponent {

  text: string;

  constructor() {
    console.log('Hello LoadingModal Component');
    this.text = 'Hello World';
  }

}
