import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';

declare var plugins: any;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})



export class AboutPage {

  Uri;

  constructor(public navCtrl: NavController) {}

 ionViewWillEnter() {
    // Put here the code you want to execute
    Camera.getPicture({ quality: 100 }).then(
    	(imageData) => 
    	{ 
    		console.log("Inside");
    		plugins.imagecrop(function success (Uri) {
          //this.Uri = Uri;
          console.log("Uri is :");
          console.log(Uri);
          this.Uri = Uri;
            },
            function fail () {
                 error => console.error("Error cropping image", error)
            }, imageData, {quality: 100})

        },
        (err) => {
 
          }
    );

 } 
  
  
}
