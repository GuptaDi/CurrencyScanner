import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';

declare var plugins: any;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})



export class AboutPage {

  base64Image: string;

  constructor(public navCtrl: NavController) {
    //this.base64Image = '';
  }

 ionViewWillEnter() {
   this.base64Image = 'note.JPG';
   //  Put here the code you want to execute
    Camera.getPicture({ quality: 100 }).then(
    	(imageData) => 
    	{ 
        //this.base64Image = imageData;
    		//console.log("Inside");
        var me = this;
    		plugins.imagecrop(function success (Uri) {

          me.base64Image = Uri.URI;
          console.log("Image path is "+me.base64Image);
          //this.Uri = Uri;
          console.log("Uri is :");
          console.log(Uri);
          //base64Image = Uri;
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
