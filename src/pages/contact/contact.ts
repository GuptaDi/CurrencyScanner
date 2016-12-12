import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Camera, ImagePicker } from 'ionic-native';

import {Http,Headers,RequestOptions} from '@angular/http';

import {AppServices} from '../../app/app.services';

declare var plugins: any;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	base64Image: string;

  constructor(public navCtrl: NavController) {

  }


ionViewWillEnter() {


// var permission = ImagePicker.hasReadPermission();
// if(!permission){
//  ImagePicker.requestReadPermission();
// }

var img = 'note.JPG';
plugins.imagecrop(function success (Uri) {
      console.log("Image path is ");
      console.log(Uri);
         // me.base64Image = Uri.URI;
          //console.log("Image path is "+me.base64Image);
          //this.Uri = Uri;
          console.log("Uri is :");
          console.log(Uri);
          //base64Image = Uri;
            },
            function fail () {
                 error => console.error("Error cropping image", error)
            }, img, {quality: 100})


// ImagePicker.getPictures({ maximumImagesCount:1, quality: 100 }).then((results) => {
//   console.log("Inside getPicute "+results);

// var img = 'note.JPG';

//   //this.base64Image = imageData;
//     		//console.log("Inside");
//         var me = this;
//     		plugins.imagecrop(function success (Uri) {
// 			console.log("Image path is ");
// 			console.log(Uri);
//           me.base64Image = Uri.URI;
//           console.log("Image path is "+me.base64Image);
//           //this.Uri = Uri;
//           console.log("Uri is :");
//           console.log(Uri);
//           //base64Image = Uri;
//             },
//             function fail () {
//                  error => console.error("Error cropping image", error)
//             }, img, {quality: 100})









// }, (err) => { console.log("Error happened")});
}
}
