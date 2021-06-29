import { HttpClient, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class VideoService {
    headers: HttpHeaders;
    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders();
    }

    /**
     * 
     * @param url to fetch the Video from other Origin
     * @returns the video as blob to download
     */
    getVideo(url: string): Observable<HttpEvent<Blob>> {
        return this.http.get(url, { reportProgress: true, observe: 'events', responseType: 'blob' });
    }
}