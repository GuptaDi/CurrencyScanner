import { Component} from '@angular/core';

import { NavController, LoadingController } from 'ionic-angular';
import { Camera } from 'ionic-native';

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
    labelData: string;
    
    private appServiceCall: any;
    private testData: any;
    news: string;
    description: string;
    
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
        };

        image.src = url;
        console.log('Inside end getDataUri');
    }


    constructor(public navCtrl: NavController, private appService: AppServices, private loadingController: LoadingController) {
        console.log("Response is 1");
        this.loadingCont = loadingController;

        this.base64Image = '';
        this.news = 'No image selected';
       
        this.appServiceCall = appService;
    }





    ionViewWillEnter() {

        // Put here the code you want to execute
      Camera.getPicture({ quality: 10 }).then(
          (imageData) => {
              this.description = '';
              this.news = 'No image selected';
             
              var me = this;
              plugins.imagecrop(function success(Uri) {
                    me.news = '';
                    me.base64Image = Uri.URI;
                    console.log("Image path is " + me.base64Image);
                    //this.Uri = Uri;
                    console.log("Uri is :");
                    me.news = '';
                    //console.log(Uri);
                    let loader = me.loadingCont.create({
                           content: "Scanning ..."
                          });  
                     loader.present();

                    me.getDataUri(Uri.URI, function(dataUri) {
                        // Do whatever you'd like with the Data URI!
                         console.log("image output ");
                         
                         

                      me.appServiceCall.getLabelData(dataUri).subscribe(data => {
                            me.news = data.news;
                            me.description = data.description;
                            loader.dismiss();

                            console.log(" Label Data ----- "+me.labelData);
                            console.log(data);
           
                        }, err => {loader.dismiss(); me.news = 'No Connection Found !!!';});
                    });
              },
                  function fail() {
                      error => console.error("Error cropping image", error)
                  }, imageData, { quality: 10 })

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

