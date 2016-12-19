import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Tips page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tips',
  templateUrl: 'tips.html'
})
export class TipsPage {
	images: Array<string>;
	grid: Array<Array<string>>; //array of arrays
  
  constructor(public navCtrl: NavController) {
  	this.images = [
      "tips/tipscorrect1.png"
  		"tips/tipswrong1.png",
  		"tips/tipscorrect2.png",
  		"tips/tipswrong2.png"
  	];
  	// define the size of grid. In our case, we are showing 3 rows
  	this.grid = Array(Math.ceil(this.images.length/2));
  }

  ionViewDidLoad() {
    console.log('Hello TipsPage Page');
  }

  ionViewWillEnter() {
  let rowNum = 0; //counter to iterate over the rows in the grid
  let totalImgCount = this.images.length;;
  for (let i = 0; i < totalImgCount; i+=2) { //iterate images

    this.grid[rowNum] = Array(2); //declare two elements per row

    if (this.images[i]) { //check file URI exists
      this.grid[rowNum][0] = this.images[i]; //insert image
    }

    if (this.images[i+1]) { //repeat for the second image
      this.grid[rowNum][1] = this.images[i+1];
    }

    rowNum++; //go on to the next row
  }

}


}
