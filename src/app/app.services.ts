import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'


@Injectable()
export class AppServices {
    constructor(public http: Http, options: RequestOptions) {
    }

    getLabelData(img) {
        console.log('inside getData ');
        let head = new Headers();
        head.append('Access-Control-Allow-Origin', '*');
         var url = 'http://54.172.239.235:8080/CurrencyDetectorRestServices/rest/img/';
        return this.http.post(url, img).map(res => res.json());
    }
}
