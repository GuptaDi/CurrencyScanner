import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';

import {Http,Headers,RequestOptions} from '@angular/http';

import {AppServices} from '../../app/app.services';

declare var plugins: any;



@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})



export class CameraPage {

  base64Image: string;
  allposts = null;
private fileReader: FileReader;
 private base64Encoded: string;
 static posts : Post[];

labelData: string;
colorData:string;

textData:string;
private appServiceCall: any;
private testData: any;

getDataUri(url, callback) {
    var image = new Image();

    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0);

        // Get raw image data
        callback(canvas.toDataURL('image/jpg').replace(/^data:image\/(png|jpg);base64,/, ''));

        // ... or get as Data URI
        //callback(canvas.toDataURL('image/jpg'));
    };

    image.src = url;
}


  constructor(public navCtrl: NavController,private appService: AppServices) {
    console.log("Response is 1");

    
//       this.getDataUri('', function(dataUri) {
//     // Do whatever you'd like with the Data URI!
//     //console.log("image output "+dataUri);
//       appService.getLabelData(dataUri).subscribe(data => {
//       this.labelData = data.responses[0].labelAnnotations[0].description;
//        console.log(" POSTS -----");
//        console.log(this.labelData);

//       });
// });

    
     this.appServiceCall = appService;
     //appService.getLabelData('note.JPG').subscribe(data => {this.posts = data});
     
    
     //appService.getLabelData('note.JPG').subscribe(data => {this.labelData = data.responses[0].labelAnnotations[0].description});
    // console.log("Response is 2"+ this.labelData);
    // appService.getColorData('note.JPG').subscribe(data => {this.colorData = data.responses[0].imagePropertiesAnnotation.dominantColors.colors[0].score});
    // console.log("Response is 3")
    // appService.getTextData('note.JPG').subscribe(data => {this.textData = data.responses[0].textAnnotations[0].description});
    //this.base64Image = '';
    console.log(" Constructur ------ ");
  }



  

  ionViewWillEnter() {
    var me = this;
       console.log("Ion Will Enter =---- ");
       this.getDataUri('sample.png', function(dataUri) {
    // Do whatever you'd like with the Data URI!
    //console.log("image output "+dataUri);

      me.appServiceCall.getLabelData(dataUri).subscribe(data => 
      {
      me.labelData = data.responses[0].labelAnnotations[0].description;

       console.log(" POSTS -----");
       console.log(me.labelData);

      });
});


//       this.testData = this.appServiceCall.getLabelData('note.JPG').subscribe(data => {
//       this.labelData = data.responses[0].labelAnnotations[0].description;
// console.log(" POSTS -----");
//        console.log(this.labelData);

//       });
       
     //console.log( this.posts );



 //   this.base64Image = 'note.JPG';
 //   //  Put here the code you want to execute
 //    Camera.getPicture({ quality: 100 }).then(
 //    	(imageData) => 
 //    	{ 
 //        //this.base64Image = imageData;
 //    		//console.log("Inside");
 //        var me = this;
 //    		plugins.imagecrop(function success (Uri) {

 //          me.base64Image = Uri.URI;
 //          console.log("Image path is "+me.base64Image);
 //          //this.Uri = Uri;
 //          console.log("Uri is :");
 //          console.log(Uri);

         
 //          //base64Image = Uri;
 //            },
 //            function fail () {
 //                 error => console.error("Error cropping image", error)
 //            }, imageData, {quality: 100})

 //        },
 //        (err) => {
 
 //          }
 //    );

  } 





}

interface Label{
  description:string; 
}

interface Text{
   description:string; 
}

interface Color{
  score:number;
}


interface Post{
  id:number;
  title:string;
  body:string;
}

