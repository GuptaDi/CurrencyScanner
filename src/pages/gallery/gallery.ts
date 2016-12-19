import { Component } from '@angular/core';

import { NavController, LoadingController, Platform} from 'ionic-angular';

import {Headers, RequestOptions} from '@angular/http';

import { ImagePicker } from 'ionic-native';

import {AppServices} from '../../app/app.services';

import { HomePage } from '../home/home';

import { Network } from 'ionic-native';


declare var plugins: any;
declare var AdMob: any;
@Component({
    selector: 'page-gallery',
    templateUrl: 'gallery.html'
})

export class GalleryPage {

    private admobId: any;
 
    base64Image: string;
    private fileReader: FileReader;

    labelData: string;
    colorData: string;

    textData: string;
    private appServiceCall: any;
    news: string;
    description: string;
    public loadingCont: LoadingController;
    public navCtrl: NavController

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


    constructor(public nav: NavController, private appService: AppServices, private loadingController: LoadingController, 
        private platform: Platform) {
        console.log("Response is 1");
        this.navCtrl = nav;
        this.loadingCont = loadingController;
        this.base64Image = ''
        this.news = 'No image selected';
        this.description = '';
        this.platform = platform;

        
       

        this.appServiceCall = appService;
       
    }
    ionViewWillEnter() {
        
        ImagePicker.getPictures({maximumImagesCount:1, quality: 10 }).then(
            (imageData) => {
                this.news = '';
                this.description = '';
                this.news = 'No image selected';
              console.log("Inside ionViewWillEnter() ");
              console.log(imageData[0]);
              var me = this;
              plugins.imagecrop(function success(Uri) {
                    me.news = '';
                    me.base64Image = Uri.URI;
                    console.log("Image path is " + me.base64Image);
                    console.log("Uri is :");
                    me.news = '';
                    me.description = '';
                    let loader = me.loadingCont.create({
                       content: "Scanning..."
                        });  
                    loader.present();

                    me.getDataUri(Uri.URI, function(dataUri) {
                         console.log("image output ");

                         //console.log(dataUri);

                        me.appServiceCall.getLabelData(dataUri).subscribe(data => {
                            me.news = data.news;
                            me.description = data.description;
                            loader.dismiss();
                            if(/(android)/i.test(navigator.userAgent)) {
                                        me.admobId = {
                                            interstitial: 'ca-app-pub-6681011345775847/4476030018'
                                        };
                                    }

                              me.platform.ready().then(() => {
                                    if(AdMob) AdMob.prepareInterstitial({
                                            adId:me.admobId.interstitial, 
                                            autoShow:true
                                        });

                                    // show the interstitial later, e.g. at end of game level
                                    if(AdMob) AdMob.showInterstitial();
                                 
                                });

                            console.log(" Label Data ----- "+me.labelData);
                            console.log(data);
                        }, err => {loader.dismiss(); me.news = 'No Connection Found !!!';});
                    });
           },
                  function fail() {
                      this.navCtrl.setRoot(HomePage);
                      error => console.error("Error cropping image", error)
                  }, imageData[0], { quality: 10 })

          },
          (err) => {
              this.navCtrl.setRoot(HomePage);
          }
      );

    }
}