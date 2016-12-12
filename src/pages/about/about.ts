import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';

import {Http,Headers,RequestOptions} from '@angular/http';

import {AppServices} from '../../app/app.services';

declare var plugins: any;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})



export class AboutPage {

  base64Image: string;
  allposts = null;

 static posts : Post[];

labelData: string;
colorData:string;

textData:string;
private appServiceCall: any;
private testData: any;

getBase64Image(imgElem) {
// imgElem must be on the same server otherwise a cross-origin error will be thrown "SECURITY_ERR: DOM Exception 18"
    var canvas = document.createElement("canvas");
    canvas.width = imgElem.clientWidth;
    canvas.height = imgElem.clientHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(imgElem, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}


  constructor(public navCtrl: NavController,private appService: AppServices) {
    console.log("Response is 1");

      this.appServiceCall = appService;
     //appService.getLabelData('note.JPG').subscribe(data => {this.posts = data});
     
    
     //appService.getLabelData('note.JPG').subscribe(data => {this.labelData = data.responses[0].labelAnnotations[0].description});
    // console.log("Response is 2"+ this.labelData);
    // appService.getColorData('note.JPG').subscribe(data => {this.colorData = data.responses[0].imagePropertiesAnnotation.dominantColors.colors[0].score});
    // console.log("Response is 3")
    // appService.getTextData('note.JPG').subscribe(data => {this.textData = data.responses[0].textAnnotations[0].description});
    //this.base64Image = '';
  }

  ionViewWillEnter() {
       

      this.testData = this.appServiceCall.getLabelData('note.JPG').subscribe(data => {
      this.labelData = data.responses[0].labelAnnotations[0].description;
console.log(" POSTS -----");
       console.log(this.labelData);

      });
       
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

  retriveData(){

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

