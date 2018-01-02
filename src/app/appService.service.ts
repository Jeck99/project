import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';
import { IModel } from "./appModel";
import 'rxjs/add/operator/catch';

export class appService {
    private header = new Headers();
    private RequestOptions = new RequestOptions();
    extractData: any;
    json: string = "/cpiNXrqUfC";
    private url: string = "http://www.json-generator.com/api/json/get";
    constructor( @Inject(Http) private http: Http) { }
    Get(): Observable<IModel[]> {
        return this.http
            .get(this.url + this.json)
            .map((response: Response) => {
                return <IModel[]>response.json();
            }).catch(this.handleError);
    }
    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}