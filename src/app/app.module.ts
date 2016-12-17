import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CameraPage } from '../pages/camera/camera';
import { GalleryPage } from '../pages/gallery/gallery';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import { RegisterPage } from '../pages/register/register';
import {AppServices} from './app.services';
//import {BusyModule} from 'angular2-busy';


@NgModule({
  declarations: [
    MyApp,
    CameraPage,
    GalleryPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage
  //  BusyModule
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CameraPage,
    GalleryPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage
  ],
  providers: [AppServices,AuthService,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
