import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions,Response} from '@angular/http';
import 'rxjs/add/operator/map'


@Injectable()
export class AppServices{
    options;
	constructor(public http: Http, options: RequestOptions) {
		this.options = options;
	}

getLabelData(img){
		 console.log('inside getData ');
		 let head = new Headers();
           head.append('Access-Control-Allow-Origin', '*');
          // headers.append('Access-Control-Allow-Origin','chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop');
          // head.append('access-control-expose-headers','content-encoding,date,server,content-length');

//img = 'gs://currencybucket/44998-xgbtzfrwwn-1478662483.jpg';
     var jsonRequest=       {
 "requests": [
  {
   "features": [
    {
     "type": "LABEL_DETECTION"
    }
   ],
   "image": {
    "content":img
   }
  }
 ]
};

         //options = new RequestOptions({ headers: headers });

 let options = new RequestOptions({ headers: head, body:jsonRequest });
 		var url = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAj2KwSa-zeC8VlbBtbJuzpa3MHjFkTbQI';//https://jsonplaceholder.typicode.com/posts';//http://54.172.239.235:8080/MongoRestServices/rest/';//https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA_MNQjvt8f9MO0h87G_KdmFABolddEJ4M';
          return this.http.post(url, jsonRequest).map(res => res.json());

    //      var url = 'https://jsonplaceholder.typicode.com/posts';
    //      return this.http.get(url,{
    // headers: head
    // }).map(res => res.json());

	}



getTextData(img){
		 console.log('inside getData ');
		 let head = new Headers();
           head.append('Access-Control-Allow-Origin', '*');
          // headers.append('Access-Control-Allow-Origin','chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop');
          // head.append('access-control-expose-headers','content-encoding,date,server,content-length');

img = 'gs://currencybucket/44998-xgbtzfrwwn-1478662483.jpg';
     var jsonRequest=       {
 "requests": [
  {
   "features": [
    {
     "type": "TEXT_DETECTION"
    }
   ],
   "image": {
    "source": {
     "gcsImageUri": img
    }
   }
  }
 ]
};

         //options = new RequestOptions({ headers: headers });

let options = new RequestOptions({ headers: head, body:jsonRequest });
		var url = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAj2KwSa-zeC8VlbBtbJuzpa3MHjFkTbQI';//https://jsonplaceholder.typicode.com/posts';//http://54.172.239.235:8080/MongoRestServices/rest/';//https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA_MNQjvt8f9MO0h87G_KdmFABolddEJ4M';
         return this.http.post(url, jsonRequest).map(res => res.json());
	}

getColorData(img){
		 console.log('inside getData ');
		 let head = new Headers();
           head.append('Access-Control-Allow-Origin', '*');
          // headers.append('Access-Control-Allow-Origin','chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop');
          // head.append('access-control-expose-headers','content-encoding,date,server,content-length');
img = 'gs://currencybucket/44998-xgbtzfrwwn-1478662483.jpg';

     var jsonRequest=       {
 "requests": [
  {
   "features": [
    {
     "type": "IMAGE_PROPERTIES"
    }
   ],
   "image": {
    "source": {
     "gcsImageUri": img
    }
   }
  }
 ]
};

         //options = new RequestOptions({ headers: headers });

let options = new RequestOptions({ headers: head, body:jsonRequest });
		var url = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAj2KwSa-zeC8VlbBtbJuzpa3MHjFkTbQI';//https://jsonplaceholder.typicode.com/posts';//http://54.172.239.235:8080/MongoRestServices/rest/';//https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA_MNQjvt8f9MO0h87G_KdmFABolddEJ4M';
         return this.http.post(url, jsonRequest).map(res => res.json());
	}




validatefront2000(text): boolean{
	if(text.search('MAHATMA') != -1 || text.search('GANDHI') != -1 || text.search('PROMISE') != -1 || 
		text.search('PAY') != -1 || text.search('BEARER') != -1)
    return true;
   else 
   	return false;
}

validateback2000(text): boolean{
   if(text.search('MANGALYAAN') != -1)
    return true;
   else 
   	return false;
}

validatefront500(text): boolean{
	return true;

}

validateback500(text): boolean{
  return true;
}

}

