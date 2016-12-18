import { Component } from '@angular/core';
import { Camera } from 'ionic-native';
import { NavController, Platform } from 'ionic-angular';
import {TipsPage} from '../tips/tips';
//import { Router } from '@angular/router';

declare var AdMob: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	private admobId: any;
  //private admobId: any;
  tipsPage: any = TipsPage;
  
  constructor(public navCtrl: NavController, private platform: Platform) {
    this.navCtrl = navCtrl;

  	this.platform = platform;
        if(/(android)/i.test(navigator.userAgent)) {
            this.admobId = {
                banner: 'ca-app-pub-6681011345775847/9045830411',
                interstitial: 'ca-app-pub-6681011345775847/4476030018'
            };
        }
	//this.tipsPage = TipsPage;
      this.platform.ready().then(() => {
            if(AdMob) {
                AdMob.createBanner({
                    adId: this.admobId.banner,
                    autoShow: true
                });
            }
            if(AdMob) AdMob.prepareInterstitial({
                	adId:this.admobId.interstitial, 
                	autoShow:true
                });

			// show the interstitial later, e.g. at end of game level
			if(AdMob) AdMob.showInterstitial();
         
        });  
        
  }
}