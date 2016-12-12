import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

import { Facebook } from 'ionic-native';

import { GooglePlus } from 'ionic-native';
import { TabsPage } from '../tabs/tabs';

 
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: Loading;
  registerCredentials = {email: '', password: ''};
 
  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}
 
  public createAccount() {
    this.nav.push(RegisterPage);
  }
 
 public googleLogin(){
 	GooglePlus.login();
 }
 public facebookLogin(){
     var me = this;
     var fbLoginSuccess = function (userData) {
       console.log("UserInfo: ", userData);
     }
    var prom = Facebook.login(["public_profile"]);

    Promise.resolve(prom).then(function(value) {
    	 console.log("promise success");
         console.log(value); // "Success"

        me.nav.setRoot(TabsPage);	

}, function(value) {
  // not called
  console.log("promise error ");
});

    console.log("promise is ");
    //console.log(prom);
}

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        setTimeout(() => {
        this.loading.dismiss();
        this.nav.setRoot(HomePage)
        });
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
      this.showError(error);
    });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
 
  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}