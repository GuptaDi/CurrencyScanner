import { Component } from '@angular/core';
import { Camera } from 'ionic-native';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  	Camera.getPicture({ quality: 100 }).then((imageData) => {

// plugins.imagecrop(function success (Uri) {
// //console.log("new image path is: " + Uri.URI);






// //var url = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA_MNQjvt8f9MO0h87G_KdmFABolddEJ4M';
// //var response = this.http.post(url).map(res => res.json());

// //console.log("JSON response is "+response);






// }, function fail () {
// error => console.error("Error cropping image", error)
// }, imageData, {quality: 100})
  
}, (err) => {
 // Handle error
 //console.log("error is: " + err);
});

  }

}
