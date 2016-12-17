import { Component, OnInit } from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { Camera } from 'ionic-native';

import {Http, Headers, RequestOptions} from '@angular/http';

import {AppServices} from '../../app/app.services';

import {Subscription} from 'rxjs';

declare var plugins: any;



@Component({
    selector: 'page-camera',
    templateUrl: 'camera.html'
})



export class CameraPage {

    busy: Subscription;

    base64Image: string;
    allposts = null;
    private fileReader: FileReader;
    private base64Encoded: string;
    static posts: Post[];

    labelData: string;
    colorData: string;

    textData: string;
    private appServiceCall: any;
    private testData: any;
    news: string;
    description: string;
    private currency: string;
    private side: string;

    public loadingCont: LoadingController;

    getDataUri(url, callback) {
        var image = new Image();
        console.log('Inside getDataUri' + url);
        image.onload = function() {
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
        console.log('Inside end getDataUri');
    }


    constructor(public navCtrl: NavController, private appService: AppServices, private loadingController: LoadingController) {
        console.log("Response is 1");
        this.loadingCont = loadingController;

        this.base64Image = 'note.jpg'
        //       this.getDataUri('', function(dataUri) {
        //     // Do whatever you'd like with the Data URI!
        //     //console.log("image output "+dataUri);
        //       appService.getLabelData(dataUri).subscribe(data => {
        //       this.labelData = data.responses[0].labelAnnotations[0].description;
        //        console.log(" POSTS -----");
        //    console.log(this.labelData);

        //       });
        // });


        this.appServiceCall = appService;
        //appService.getLabelData('note.JPG').subscribe(data => {this.posts = data}    
        //appService.getLabelData('note.JPG').subscribe(data => {this.labelData = data.responses[0].labelAnnotations[0].description});
        // console.log("Response is 2"+ this.labelData);
        // appService.getColorData('note.JPG').subscribe(data => {this.colorData = data.responses[0].imagePropertiesAnnotation.dominantColors.colors[0].score});
        // console.log("Response is 3")
        // appService.getTextData('note.JPG').subscribe(data => {this.textData = data.responses[0].textAnnotations[0].description});
        //this.base64Image = '';
        console.log(" Constructur ------ ");
    }





    ionViewWillEnter() {

        // Put here the code you want to execute
      Camera.getPicture({ quality: 50 }).then(
          (imageData) => {
              this.news = '';
              this.description = '';
              //this.base64Image = imageData;
              //console.log("Inside");
              var me = this;
              plugins.imagecrop(function success(Uri) {

                    me.base64Image = Uri.URI;
                    console.log("Image path is " + me.base64Image);
                    //this.Uri = Uri;
                    console.log("Uri is :");
                    //console.log(Uri);


                    me.getDataUri(Uri.URI, function(dataUri) {
                        // Do whatever you'd like with the Data URI!
                         console.log("image output ");
                         me.news = 'Scanning ...';
                         this.description = '';
                         let loader = me.loadingCont.create({
                           content: ""
                          });  
                         loader.present();
                         

                      me.appServiceCall.getLabelData(dataUri).subscribe(data => {
                            me.news = data.news;
                            me.description = data.description;
                            loader.dismiss();

                            console.log(" Label Data ----- "+me.labelData);
                            console.log(data);
           
                        });
                    });


                    //base64Image = Uri;
              },
                  function fail() {
                      error => console.error("Error cropping image", error)
                  }, imageData, { quality: 100 })

          },
          (err) => {

          }
      );

    }

}


interface Label {
    description: string;
}

interface Text {
    description: string;
}

interface Color {
    score: number;
}


interface Post {
    id: number;
    title: string;
    body: string;
}

