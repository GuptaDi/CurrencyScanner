import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map'


@Injectable()
export class AppServices {
    options;
    constructor(public http: Http, options: RequestOptions) {
        this.options = options;
    }

    getLabelData(img) {
        console.log('inside getData ');
        let head = new Headers();
        head.append('Access-Control-Allow-Origin', '*');
        // headers.append('Access-Control-Allow-Origin','chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop');
        // head.append('access-control-expose-headers','content-encoding,date,server,content-length');

        //img = 'gs://currencybucket/44998-xgbtzfrwwn-1478662483.jpg';
        

        //options = new RequestOptions({ headers: headers });

        //let options = new RequestOptions({ headers: head, body: jsonRequest });
         //var url = 'http://54.172.239.235:8080/CurrencyDetectorRestServices/rest/img/';
         var url = 'http://192.168.0.104:8080/CurrencyDetectorRestServices/rest/img/';
         
       // var url = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAj2KwSa-zeC8VlbBtbJuzpa3MHjFkTbQI';//https://jsonplaceholder.typicode.com/posts';//http://54.172.239.235:8080/MongoRestServices/rest/';//https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA_MNQjvt8f9MO0h87G_KdmFABolddEJ4M';
        return this.http.post(url, img).map(res => res.json());

        //      var url = 'https://jsonplaceholder.typicode.com/posts';
        //      return this.http.get(url,{
        // headers: head
        // }).map(res => res.json());

    }



    getTextData(img) {
        console.log('inside getTextData ');
        let head = new Headers();
        head.append('Access-Control-Allow-Origin', '*');
        // headers.append('Access-Control-Allow-Origin','chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop');
        // head.append('access-control-expose-headers','content-encoding,date,server,content-length');

       // img = 'gs://currencybucket/44998-xgbtzfrwwn-1478662483.jpg';
        var jsonRequest = {
            "requests": [
                {
                    "features": [
                        {
                            "type": "    "
                        }
                    ],
                    "image": {
                        "content": img
                    }
                }
            ]
        };

        //options = new RequestOptions({ headers: headers });

        let options = new RequestOptions({ headers: head, body: jsonRequest });
        var url = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAj2KwSa-zeC8VlbBtbJuzpa3MHjFkTbQI';//https://jsonplaceholder.typicode.com/posts';//http://54.172.239.235:8080/MongoRestServices/rest/';//https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA_MNQjvt8f9MO0h87G_KdmFABolddEJ4M';
        return this.http.post(url, jsonRequest).map(res => res.json());
    }

    getColorData(img) {
        console.log('inside getData ');
        let head = new Headers();
        head.append('Access-Control-Allow-Origin', '*');
        // headers.append('Access-Control-Allow-Origin','chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop');
        // head.append('access-control-expose-headers','content-encoding,date,server,content-length');
       // img = 'gs://currencybucket/44998-xgbtzfrwwn-1478662483.jpg';

        var jsonRequest = {
            "requests": [
                {
                    "features": [
                        {
                            "type": "IMAGE_PROPERTIES"
                        }
                    ],
                    "image": {
                        "content": img
                    }
                }
            ]
        };

        //options = new RequestOptions({ headers: headers });

        let options = new RequestOptions({ headers: head, body: jsonRequest });
        var url = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAj2KwSa-zeC8VlbBtbJuzpa3MHjFkTbQI';//https://jsonplaceholder.typicode.com/posts';//http://54.172.239.235:8080/MongoRestServices/rest/';//https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA_MNQjvt8f9MO0h87G_KdmFABolddEJ4M';
        return this.http.post(url, jsonRequest).map(res => res.json());
    }




    validateObverse2000(text): boolean {
      console.log('Inside validateObverse2000 '+text);
        if (text.search('2000') != -1 || text.search('MAHATMA') != -1 || text.search('GANDHI') != -1 || text.search('PROMISE') != -1 ||
            text.search('PAY') != -1 || text.search('BEARER') != -1)
            return true;
        else
            return false;
    }

    validateReverse2000(text): boolean {
        if (text.search('MANGALYAAN') != -1)
            return true;
        else
            return false;
    }

    validateObverse500(text): boolean {
        return true;

    }

    validateReverse500(text): boolean {
        return true;
    }



    validateColor2000(color1): boolean {
        console.log('Inside validateColor2000')
        console.log(color1);
        var color2 = {
            "color": {
                "red": 202,
                "green": 132,
                "blue": 149
            }
        };
var temp = this.isNeighborColor(color1, color2);
console.log('Temp value '+temp);
        return temp;//this.isNeighborColor(color1, color2);
    }

    validateColor500(color1): boolean {
        var color2 = {
            "color": {
                "red": 202,
                "green": 132,
                "blue": 149
            }
        };

        return this.isNeighborColor(color1, color2);
    }

    validateColor100(color1): boolean {
        var color2 = {
            "color": {
                "red": 202,
                "green": 132,
                "blue": 149
            }
        };

        return this.isNeighborColor(color1, color2);
    }

    validateColor50(color1): boolean {
        var color2 = {
            "color": {
                "red": 202,
                "green": 132,
                "blue": 149
            }
        };

        return this.isNeighborColor(color1, color2);
    }


    validateColor10(color1): boolean {
        var color2 = {
            "color": {
                "red": 202,
                "green": 132,
                "blue": 149
            }
        };
        return this.isNeighborColor(color1, color2);
    }

    isNeighborColor(color1, color2): boolean {

        var tolerance = 20;
console.log('inside isNeighborColor');
var x = Math.abs(color1.color.red - color2.color.red) <= tolerance
          //  && Math.abs(color1.g - color2.g) <= tolerance
           // && Math.abs(color1.b - color2.b) <= tolerance;

            console.log('x value is '+color1.color.red+' '+color2.color.red+' '+x);
            console.log(color1);
            console.log(color2);

        return Math.abs(color1.color.red - color2.color.red) <= tolerance;
           // && Math.abs(color1.g - color2.g) <= tolerance
            //&& Math.abs(color1.b - color2.b) <= tolerance;
    }
}
